import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Null, Token } from '@core/common';
import { ISessionState } from '../interfaces';
import { SessionReducer } from './session.reducer';

export module SessionQuery {
	export const getSessionState: MemoizedSelector<
		SessionReducer.SessionPartialState,
		ISessionState
	> = createFeatureSelector<ISessionState>(SessionReducer.SESSION_FEATURE_KEY);

	export const getToken: MemoizedSelector<
		SessionReducer.SessionPartialState,
		Null<string>
	> = createSelector<SessionReducer.SessionPartialState, ISessionState, Null<string>>(
		getSessionState,
		(state: ISessionState) => state.token
	);

	export const getIsLoggedOut: MemoizedSelector<
		SessionReducer.SessionPartialState,
		boolean
	> = createSelector<SessionReducer.SessionPartialState, ISessionState, boolean>(
		getSessionState,
		(state: ISessionState) => !state.token
	);

	export const getIsAuthorized: MemoizedSelector<
		SessionReducer.SessionPartialState,
		boolean
	> = createSelector<SessionReducer.SessionPartialState, ISessionState, boolean>(
		getSessionState,
		(state: ISessionState) => !!state.token
	);

	export const getTokenPayload: MemoizedSelector<
		SessionReducer.SessionPartialState,
		Null<Token>
	> = createSelector<SessionReducer.SessionPartialState, ISessionState, Null<Token>>(
		getSessionState,
		(state: ISessionState) => state.tokenPayload ?? null
	);

	export const getUserId: MemoizedSelector<
		SessionReducer.SessionPartialState,
		Null<number>
	> = createSelector<
		SessionReducer.SessionPartialState,
		ISessionState,
		Null<Token>,
		Null<number>
	>(
		getSessionState,
		getTokenPayload,
		(_state: ISessionState, token: Null<Token>) => token?.userId ?? null
	);

	/*export const getUserId: MemoizedSelector<
		SessionReducer.SessionPartialState,
		Null<number>
	> = createSelector<
		SessionReducer.SessionPartialState,
		ISessionState,
		Null<Token>,
		Null<number>
	>(getSessionState, getTokenPayload, (_state: ISessionState, _token: Null<Token>) => 2 ?? null);*/
}
