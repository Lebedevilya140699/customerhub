import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
/*import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import {
	AUTHORIZATION_KEY,
	AUTHORIZATION_METHOD,
	ENDPOINT_FILTERS,
	FORBIDDEN_URL,
} from '@core/common';
import { SessionFacade } from '@core/session';
import { NotificationService } from '@site-core/toast';
import { NotificationService as _NotificationService } from 'carbon-components-angular';
import { AuthHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { ForbiddenInterceptor } from './interceptors/forbidden.interceptor';*/
import { HttpService } from './services';
import { AuthHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { AUTHORIZATION_KEY, AUTHORIZATION_METHOD, ENDPOINT_FILTERS } from '@core/common';
import { SessionFacade } from '@core/session';

//TODO: время жизни токена авторизации должно деавторизировать юзера
export interface IHttpOptions {
	readonly tokenTtl?: number;
}

@NgModule({
	providers: [HttpService],
	imports: [CommonModule, HttpClientModule],
	exports: [HttpClientModule],
})
export class HttpModule {
	public static forRoot(): ModuleWithProviders<HttpModule> {
		return {
			ngModule: HttpModule,
			providers: [
				{
					provide: HTTP_INTERCEPTORS,
					useClass: AuthHeaderInterceptor,
					multi: true,
					deps: [
						ENDPOINT_FILTERS,
						AUTHORIZATION_KEY,
						AUTHORIZATION_METHOD,
						SessionFacade,
					],
				},
				/*
				{
					provide: HTTP_INTERCEPTORS,
					useClass: ForbiddenInterceptor,
					multi: true,
					deps: [ENDPOINT_FILTERS, FORBIDDEN_URL, Router],
				},
				{
					provide: HTTP_INTERCEPTORS,
					useClass: ExceptionInterceptor,
					multi: true,
					deps: [ENDPOINT_FILTERS, NotificationService],
				}*/
			],
		};
	}
}
