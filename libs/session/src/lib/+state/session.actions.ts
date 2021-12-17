import { BaseAction, PayloadAction } from '@core/common';

export module SessionAction {
	export enum SessionActionTypes {
		LOAD_SESSION = '[Session] Load Session',
		SESSION_LOADED = '[Session] Session Loaded',
		SET_TOKEN = '[Session] Set Token',
		LOGOUT = '[Session] Logout',
	}

	export class LoadSession extends BaseAction<SessionActionTypes.LOAD_SESSION> {
		constructor() {
			super(SessionActionTypes.LOAD_SESSION);
		}
	}

	export class SessionLoaded extends PayloadAction<
		string | null,
		SessionActionTypes.SESSION_LOADED
	> {
		constructor(payload: string | null) {
			super(payload, SessionActionTypes.SESSION_LOADED);
		}
	}

	export class SetToken extends PayloadAction<string | null, SessionActionTypes.SET_TOKEN> {
		constructor(payload: string | null) {
			super(payload, SessionActionTypes.SET_TOKEN);
		}
	}

	export class Logout extends BaseAction<SessionActionTypes.LOGOUT> {
		constructor() {
			super(SessionActionTypes.LOGOUT);
		}
	}
}

export type SessionAction =
	| SessionAction.LoadSession
	| SessionAction.SessionLoaded
	| SessionAction.SetToken
	| SessionAction.Logout;
