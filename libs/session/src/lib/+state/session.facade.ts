import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LoadableFacade, Null } from '@core/common';
import { Observable } from 'rxjs';
import { ISessionState } from '../interfaces';
import { SessionAction } from './session.actions';
import { SessionReducer } from './session.reducer';
import { SessionQuery } from './session.selectors';

export interface SessionFacade {
	reset(): void;
}

@Injectable()
export class SessionFacade extends LoadableFacade<
	SessionReducer.SessionPartialState,
	ISessionState,
	SessionAction.SessionActionTypes,
	SessionAction
> {
	public readonly isAuthorized$: Observable<boolean>;
	public readonly accessToken$: Observable<Null<string>>;
	public readonly isLoggedOut$: Observable<boolean>;
	public readonly userId$: Observable<Null<number>>;

	constructor(store: Store<SessionReducer.SessionPartialState>) {
		super(store, SessionReducer.SESSION_FEATURE_KEY, {
			reset: SessionAction.Logout,
		});
		this.accessToken$ = store.pipe(select(SessionQuery.getToken));
		this.isLoggedOut$ = store.pipe(select(SessionQuery.getIsLoggedOut));
		this.isAuthorized$ = store.pipe(select(SessionQuery.getIsAuthorized));
		this.userId$ = store.pipe(select(SessionQuery.getUserId));
	}

	public loadSession(): void {
		this.store.dispatch(new SessionAction.LoadSession());
	}

	public setToken(token: string): void {
		this.store.dispatch(new SessionAction.SetToken(token));
	}
}
