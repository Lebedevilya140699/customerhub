import {
	HttpEvent,
	HttpHandler,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
	AUTHORIZATION_KEY,
	AUTHORIZATION_METHOD,
	EndpointFilter,
	ENDPOINT_FILTERS,
} from '@core/common';
import { Observable } from 'rxjs';
import { SessionFacade } from '@core/session';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
	private readonly authFilters: EndpointFilter[];

	constructor(
		@Inject(ENDPOINT_FILTERS) endpointFilters: EndpointFilter[],
		@Inject(AUTHORIZATION_KEY) private readonly authorizationKey: string,
		@Inject(AUTHORIZATION_METHOD)
		private readonly authorizationMethod: string,
		private readonly session: SessionFacade
	) {
		this.authFilters = endpointFilters.filter((endpointFilter: EndpointFilter) => {
			return endpointFilter.reason === 'auth';
		});
	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (
			this.authFilters.some((endpointFilter: EndpointFilter) =>
				endpointFilter.endpointPattern.test(req.url)
			) ||
			(!!req.headers && req.headers.has(this.authorizationKey))
		) {
			return next.handle(req);
		}

		let headers: HttpHeaders = req.headers ?? new HttpHeaders();

		return this.session.accessToken$.pipe(
			take(1),
			switchMap((token: string | null) => {
				if (!!token) {
					headers = headers.set(
						this.authorizationKey,
						this.authorizationMethod + ' ' + token
					);
				}

				return next.handle(
					req.clone({
						headers,
					})
				);
			})
		);
	}
}
