import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';
import { SessionModule } from '@core/session';
import { LayoutModule } from '@core/layout';
import { AuthorizedHandler } from './handlers/authorized.handler';
import { Config, ENDPOINT_FILTERS, EndpointFilter } from '@core/common';
import { CoreLibModule } from '@core/core-lib';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { configureCore } from './configure-core';
import { NavigationModule } from '@core/navigation';
import { ConfigModule } from '@core/config';
import {
	AuthProfile,
	CertificateFormProfile,
	ContactsFormProfile,
	ResumeFormProfile,
	ResumeProfile,
	TasksProfile,
	UserProfile,
} from '@core/platform';
import { UserModule } from '@core/user';
import { TasksModule } from '@core/tasks';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		ConfigModule.forRoot({
			configUrl: environment.configUrl,
			configConstructable: Config,
		}),
		SessionModule.forRoot({
			initializers: [],
			resetters: [],
		}),
		CoreLibModule.forRoot(
			{
				logoutUrl: environment.logoutUrl,
				apiUrl: environment.apiUrl,
				isProduction: environment.production,
				authorizationMethod: environment.authorizationMethod,
				authorizationKey: environment.authorizationKey,
				accessTokenKey: environment.accessTokenKey,
				loginUrl: environment.loginUrl,
				profiles: [
					UserProfile,
					ResumeFormProfile,
					AuthProfile,
					ResumeProfile,
					ContactsFormProfile,
					CertificateFormProfile,
					TasksProfile,
				],
				storage: LocalStorageService,
				rootTitle: environment.rootTitle,
				application: environment.application,
			},
			configureCore
		),
		NgxWebstorageModule.forRoot({
			prefix: 'hh.hrhub',
			separator: '.',
			caseSensitive: true,
		}),
		LayoutModule.forRoot({
			items: [
				{
					code: 'dashboard',
					route: '/dashboard',
				},
				{
					code: 'employees',
					route: '/issues',
				},
			],
		}),
		NavigationModule.forRoot({
			filter: /(404|403|500|auth)/,
		}),
		UserModule.forRoot(),
		TasksModule.forRoot(),
	],
	providers: [AuthorizedHandler],
	exports: [SessionModule],
})
export class CoreModule {
	public static forRoot(): ModuleWithProviders<CoreModule> {
		return {
			ngModule: CoreModule,
			providers: [
				{
					provide: ENDPOINT_FILTERS,
					useValue: filters,
				},
			],
		};
	}
}

export const filters: EndpointFilter[] = [
	{
		reason: 'auth',
		endpointPattern: /config\.json/,
	},
	{
		reason: 'auth',
		endpointPattern: /i18n/,
	},
	{
		reason: 'auth',
		endpointPattern: /auth\/login/,
	},
	{
		reason: 'forbidden',
		endpointPattern: /auth/,
	},
	{
		reason: 'notification',
		endpointPattern: /(auth\/login|users\/password\/reset)/,
	},
];
