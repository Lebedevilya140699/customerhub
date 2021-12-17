import { Injectable, Injector } from '@angular/core';
import { Mapper } from '@nartc/automapper';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { BaseError, DataAccessEffect } from '@core/common';
import { AuthForm, LoginRequest, LoginResponse } from '@core/platform';
import { SessionFacade } from '@core/session';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthReducer } from '../+state/auth.reducer';
import { AuthState } from '../enums';
import { AuthService } from '../services';
import { AuthAction } from './auth.action';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects extends DataAccessEffect<
	AuthReducer.AuthReducerPartialState,
	AuthAction,
	AuthService
> {
	public readonly submitLoginForm$: any = createEffect(() =>
		this.dataPersistence.fetch(AuthAction.AuthActions.SUBMIT_LOGIN_FORM, {
			id: () => null,
			run: (
				action: AuthAction.SubmitLoginForm,
				state: AuthReducer.AuthReducerPartialState
			) => {
				const formValue = state[AuthReducer.AUTH_FEATURE_KEY].value;
				const req: LoginRequest = Mapper.map(formValue, LoginRequest, AuthForm);
				//TODO: Форма должна очищаться после отправки, но щас стор поддерживает
				// только саму форму, нужно завезти отдельный стор для авторизации и стор для форм авторизации
				//this.authFacade.persistForm(formValue);

				return this._login(req, action);
			},
			onError: (_a: AuthAction.SubmitLoginForm, e: any): Observable<any> | any => {
				return this._handleError(e);
			},
		})
	);

	public readonly setState$: any = createEffect(() =>
		this.dataPersistence.fetch(AuthAction.AuthActions.SET_STATE, {
			run: (a: AuthAction.SetState, _s: AuthReducer.AuthReducerPartialState) => {
				console.log('setState', a.payload);
				this.router.navigateByUrl('/');
				return { type: 'NOOP' } as Action;
			},
		})
	);

	constructor(
		dataPersistence: DataPersistence<AuthReducer.AuthReducerPartialState>,
		store$: Store<AuthReducer.AuthReducerPartialState>,
		actions$: Actions<AuthAction>,
		service: AuthService,
		injector: Injector,
		private readonly sessionFacade: SessionFacade,
		private readonly router: Router
	) {
		super(dataPersistence, store$, actions$, service, injector);
	}

	protected _handleError(error: BaseError): Action {
		if (error.name === 'auth.jwt.invalid') {
			return { type: 'NOOP' };
		}
		return super._handleError(error);
	}

	private _login(req: LoginRequest, action: AuthAction.SubmitLoginForm): Observable<Action> {
		return this.service
			.submitFormAsync<LoginResponse, AuthForm>(action.payload.consumer.withBody(req))
			.asObservable()
			.pipe(
				map((response: LoginResponse) => {
					this.sessionFacade.setToken(response.token!);
					return new AuthAction.SetState(AuthState.AUTHORIZED);
				})
			) as Observable<Action>;
	}
}
