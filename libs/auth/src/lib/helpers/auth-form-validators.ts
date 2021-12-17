import { AuthForm } from '@core/platform';
import {
	FormControlState,
	FormGroupState,
	StateUpdateFns,
	updateGroup,
	validate,
} from 'ngrx-forms';
import { email, equalTo, required } from 'ngrx-forms/validation';
import { IAuthState } from '../interfaces/auth.state';

export module AuthFormValidators {
	export const validateNewPassword: StateUpdateFns<{
		newPassword: string;
		confirmPassword: string;
	}> = {
		newPassword: validate(required),
		confirmPassword: (
			state: FormControlState<string>,
			parentState: FormGroupState<{
				newPassword: string;
				confirmPassword: string;
			}>
		) => {
			return validate(state, required, equalTo(parentState.value.newPassword));
		},
	};

	export const createValidator: (state: IAuthState) => FormGroupState<AuthForm> = (
		state: IAuthState
	) => {
		let updateFns: StateUpdateFns<AuthForm> = {};
		if ('login' in state.controls) {
			updateFns = {
				...updateFns,
				login: validate(required, email),
			} as StateUpdateFns<AuthForm>;
		}
		if ('password' in state.controls) {
			updateFns = {
				...updateFns,
				password: validate(required),
			} as StateUpdateFns<AuthForm>;
		}
		return updateGroup<AuthForm>(state, updateFns);
	};
}
