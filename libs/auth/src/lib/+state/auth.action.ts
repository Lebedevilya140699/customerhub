import { BaseAction, FormAction, FormActionPayload, PayloadAction } from '@core/common';
import { AuthForm, LoginResponse } from '@core/platform';
import { AuthState } from '../enums';

export module AuthAction {
	export enum AuthActions {
		SUBMIT_LOGIN_FORM = '[Auth] Submit Login Form',
		UPDATE_AUTH_FORM_CONTROL = '[Auth] Update AuthForm Control',
		UPDATE_AUTH_FORM = '[Auth] Update AuthForm',
		RESET_AUTH_FORM = '[Auth] Reset AuthForm',
		SET_STATE = '[Auth] Set State',
	}

	export class SubmitLoginForm extends FormAction.SubmitFormAsync<
		AuthForm,
		AuthActions.SUBMIT_LOGIN_FORM,
		LoginResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<AuthForm, LoginResponse>) {
			super(payload, AuthActions.SUBMIT_LOGIN_FORM);
		}
	}

	export class ResetAuthForm extends BaseAction<AuthActions.RESET_AUTH_FORM> {
		constructor() {
			super(AuthActions.RESET_AUTH_FORM);
		}
	}

	export class UpdateAuthForm extends FormAction.UpdateForm<
		AuthForm,
		AuthActions.UPDATE_AUTH_FORM
	> {
		constructor(value: FormActionPayload.IUpdateValue<AuthForm>) {
			super(value, AuthAction.AuthActions.UPDATE_AUTH_FORM);
		}
	}

	export class UpdateAuthFormControl extends FormAction.UpdateGroupElementAction<
		AuthForm,
		AuthActions.UPDATE_AUTH_FORM_CONTROL
	> {
		constructor(value: FormActionPayload.IUpdateGroupElement<AuthForm>) {
			super(value, AuthAction.AuthActions.UPDATE_AUTH_FORM_CONTROL);
		}
	}

	export class SetState extends PayloadAction<AuthState, AuthActions.SET_STATE> {
		constructor(payload: AuthState) {
			super(payload, AuthActions.SET_STATE);
		}
	}
}

export type AuthAction =
	| AuthAction.SubmitLoginForm
	| AuthAction.ResetAuthForm
	| AuthAction.UpdateAuthFormControl
	| AuthAction.UpdateAuthForm
	| AuthAction.SetState;
