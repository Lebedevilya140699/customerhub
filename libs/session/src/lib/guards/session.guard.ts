import { Inject, Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { JwtUtils, LOGIN_URL } from '@core/common';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SessionFacade } from '../+state/session.facade';

@Injectable()
export class SessionGuard implements CanActivate, CanActivateChild {
	constructor(
		private readonly sessionFacade: SessionFacade,
		private readonly router: Router,
		@Inject(LOGIN_URL) private readonly loginUrl: string
	) {}

	public canActivate(
		_next: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot
	): Observable<boolean | UrlTree> {
		return this.sessionFacade.accessToken$.pipe(
			take(1),
			map(
				(token: string | null) =>
					JwtUtils.checkToken(token) || this.router.parseUrl(this.loginUrl)
			)
		);
	}

	public canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> {
		return this.canActivate(childRoute, state);
	}
}
