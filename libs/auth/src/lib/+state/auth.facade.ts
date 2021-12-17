import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormFacade, HttpConsumer } from '@core/common';
import { AuthForm, LoginResponse } from '@core/platform';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthEndpoints } from '../enums';
import { AuthReducer } from './auth.reducer';
import { AuthAction } from './auth.action';
import { IAuthState } from '../interfaces/auth.state';

@Injectable()
export class AuthFacade extends FormFacade<
	AuthReducer.AuthReducerPartialState,
	AuthForm,
	AuthAction.AuthActions,
	AuthAction,
	IAuthState
> {
	constructor(store: Store<AuthReducer.AuthReducerPartialState>) {
		super(store, AuthReducer.AUTH_FEATURE_KEY, {
			updateFormAction: AuthAction.UpdateAuthForm,
			reset: AuthAction.ResetAuthForm,
			updateFormControlAction: AuthAction.UpdateAuthFormControl,
		});
	}

	public submitLoginForm(): HttpConsumer<LoginResponse, AuthForm> {
		return this.formIsValid$.pipe(
			take(1),
			switchMap((isValid: boolean) => {
				if (!isValid) return of();

				const consumer = new HttpConsumer<LoginResponse, AuthForm>({
					endpoint: AuthEndpoints.CHECK_PASSWORD,
				});

				this.store.dispatch(
					new AuthAction.SubmitLoginForm({
						consumer: consumer,
					})
				);

				return consumer;
			})
		) as HttpConsumer<LoginResponse, AuthForm>;
	}
}
