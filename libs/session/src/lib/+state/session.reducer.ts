import { JwtUtils, Null, Token } from '@core/common';
import { ISessionState } from '../interfaces';
import { SessionAction } from './session.actions';

export module SessionReducer {
	export const SESSION_FEATURE_KEY = 'session';

	export interface SessionPartialState {
		readonly [SESSION_FEATURE_KEY]: ISessionState;
	}

	export const initialState: ISessionState = {
		token: null,
		tokenPayload: null,
		loaded: false,
		isLoading: false,
	};

	export function reducer(
		state: ISessionState = initialState,
		action: SessionAction
	): ISessionState {
		switch (action.type) {
			case SessionAction.SessionActionTypes.LOAD_SESSION: {
				state = {
					...state,
					isLoading: true,
				};
				break;
			}
			case SessionAction.SessionActionTypes.SESSION_LOADED: {
				state = setToken(state, action);
				break;
			}
			case SessionAction.SessionActionTypes.SET_TOKEN: {
				state = setToken(state, action);
				break;
			}
			case SessionAction.SessionActionTypes.LOGOUT: {
				state = {
					token: null,
					tokenPayload: null,
					isLoading: false,
					loaded: true,
				};
				break;
			}
		}
		return state;
	}

	const setToken = (
		state: ISessionState,
		action: SessionAction.SetToken | SessionAction.SessionLoaded
	): ISessionState => {
		const token: Null<Token> = JwtUtils.parseJwtPayload(action.payload);

		return {
			...state,
			token: !!token ? action.payload : null,
			tokenPayload: token,
			loaded: true,
			isLoading: false,
		};
	};
}
