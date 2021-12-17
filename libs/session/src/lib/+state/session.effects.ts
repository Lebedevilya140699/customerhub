import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JwtUtils } from '@core/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { SessionAction } from './session.actions';

@Injectable()
export class SessionEffects {
	public loadSession$: Observable<SessionAction.SessionLoaded> = createEffect(() =>
		this.actions$.pipe(
			ofType(SessionAction.SessionActionTypes.LOAD_SESSION),
			map((_action: SessionAction.LoadSession) => {
				const token = this.service.retrieveToken();
				if (!JwtUtils.parseJwtPayload(token)) {
					this.service.clear();
				}

				return new SessionAction.SessionLoaded(this.service.retrieveToken());
			})
		)
	);

	public setToken$: Observable<void> = createEffect(
		() =>
			this.actions$.pipe(
				ofType(SessionAction.SessionActionTypes.SET_TOKEN),
				map((action: SessionAction.SetToken) => {
					this.service.setToken(action.payload);
				})
			),
		{ dispatch: false }
	);

	public logout$: Observable<void> = createEffect(
		() =>
			this.actions$.pipe(
				ofType(SessionAction.SessionActionTypes.LOGOUT),
				map((_action: SessionAction.Logout) => {
					this.service.clear();
					// this.handlerService.handle(SessionState.LOG_OUT);
				})
			),
		{ dispatch: false }
	);

	constructor(
		private readonly actions$: Actions<SessionAction>,
		private readonly service: SessionService
	) {}
}
