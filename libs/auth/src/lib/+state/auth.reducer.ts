import { IAuthState } from '../interfaces/auth.state';
import {
	createFormGroupState,
	formGroupReducer,
	markAsSubmitted,
	markAsTouched,
	markAsUnsubmitted,
	markAsUntouched,
	setValue,
	updateGroup,
} from 'ngrx-forms';
import { AuthForm } from '@core/platform';
import { AuthAction } from './auth.action';
import { AuthFormValidators } from '../helpers/auth-form-validators';
import { AuthState } from '../enums';

export module AuthReducer {
	export const AUTH_FEATURE_KEY = 'auth';

	export interface AuthReducerPartialState {
		readonly [AUTH_FEATURE_KEY]: IAuthState;
	}

	export const initialState: IAuthState = createFormGroupState<AuthForm>(AUTH_FEATURE_KEY, {
		login: null,
		password: null,
	});

	export function reducer(state: IAuthState = initialState, action: AuthAction): IAuthState {
		state = formGroupReducer(state, action);

		switch (action.type) {
			case AuthAction.AuthActions.RESET_AUTH_FORM:
				break;
			case AuthAction.AuthActions.SUBMIT_LOGIN_FORM: {
				state = markAsSubmitted(state);
				break;
			}
			case AuthAction.AuthActions.UPDATE_AUTH_FORM: {
				state = createFormGroupState<AuthForm>(AUTH_FEATURE_KEY, action.payload.value);
				break;
			}
			case AuthAction.AuthActions.UPDATE_AUTH_FORM_CONTROL: {
				state = markAsTouched(state);
				state = updateGroup<AuthForm>(state, {
					[action.payload.name]: setValue(action.payload.value),
				});
				break;
			}
			case AuthAction.AuthActions.SET_STATE: {
				state = markAsUnsubmitted(state);
				state = markAsUntouched(state);
				switch (action.payload) {
					case AuthState.AUTHORIZED:
					case AuthState.AUTH_ERROR: {
						state = setValue(state, AuthReducer.initialState.value);
						break;
					}
					case AuthState.RESET: {
						state = setValue(state, {
							login: null,
						});
						break;
					}
				}
				break;
			}
		}

		return AuthFormValidators.createValidator(state);
	}
}
