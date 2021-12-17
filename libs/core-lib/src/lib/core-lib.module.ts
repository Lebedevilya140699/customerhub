import {
	APP_INITIALIZER,
	ErrorHandler,
	Inject,
	Injector,
	ModuleWithProviders,
	NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducer, State, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import {
	ACCESS_TOKEN_KEY,
	API_URL,
	AUTHORIZATION_KEY,
	AUTHORIZATION_METHOD,
	BaseStorage,
	CommonModule,
	FORBIDDEN_URL,
	HandlerService,
	IS_PRODUCTION,
	LOGIN_URL,
	MAPPING_PROFILES,
	META_REDUCERS,
	META_REDUCERS_PROVIDERS,
} from '@core/common';
import { EndpointManagerService, HttpModule } from '@core/http';
import { storeLogger } from 'ngrx-store-logger';
import { TitleEffects } from './effects/title.effects';
import { initializeMapper } from './helpers';
import { CORE_BUILDER } from './injection-tokens/core-builder';
import { ROOT_TITLE } from './injection-tokens/root-title';
import { ICoreOptions } from './interfaces';
import { CoreLibModuleBuilder } from './models';
import { ActionErrorHandler } from './services/action-error-handler';
import { TitleService } from './services/title.service';

export function logger(reducer: ActionReducer<State<any>>): any {
	return storeLogger()(reducer);
}

export const META_REDUCERS_FACTORY = (isProduction: boolean) => {
	return isProduction ? [] : [logger];
};

@NgModule({
	imports: [
		BrowserModule,
		CommonModule,
		HttpModule.forRoot(),
		StoreModule.forRoot(
			{},
			{
				runtimeChecks: {
					strictStateImmutability: false,
					strictActionImmutability: false,
					strictStateSerializability: false,
					strictActionSerializability: false,
				},
			}
		),
		EffectsModule.forRoot([TitleEffects]),
		NxModule.forRoot(),
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Full,
		}),
		BrowserAnimationsModule,
	],
	providers: [EndpointManagerService, TitleService],
})
export class CoreLibModule {
	public static forRoot(
		options: ICoreOptions,
		configure: (builder: CoreLibModuleBuilder) => void
	): ModuleWithProviders<CoreLibModule> {
		return {
			ngModule: CoreLibModule,
			providers: [
				{
					provide: FORBIDDEN_URL,
					useValue: options.logoutUrl,
				},
				{
					provide: LOGIN_URL,
					useValue: options.loginUrl,
				},
				{
					provide: API_URL,
					useValue: options.apiUrl,
				},
				{
					provide: IS_PRODUCTION,
					useValue: options.isProduction,
				},
				{
					provide: AUTHORIZATION_KEY,
					useValue: options.authorizationKey,
				},
				{
					provide: AUTHORIZATION_METHOD,
					useValue: options.authorizationMethod,
				},
				{
					provide: ACCESS_TOKEN_KEY,
					useValue: options.accessTokenKey,
				},
				{
					provide: CORE_BUILDER,
					useFactory: configure,
				},
				{
					provide: MAPPING_PROFILES,
					useValue: options.profiles,
				},
				{
					provide: APP_INITIALIZER,
					useFactory: initializeMapper,
					deps: [MAPPING_PROFILES],
					multi: true,
				},
				{
					provide: BaseStorage,
					useExisting: options.storage,
				},
				{
					provide: ErrorHandler,
					useClass: ActionErrorHandler,
					deps: [Injector],
				},
				{
					// we provide apiUrl from environment to replace root with endpoint manager
					provide: DefaultDataServiceConfig,
					useValue: {
						root: options.apiUrl,
					},
				},
				{
					provide: ROOT_TITLE,
					useValue: options.rootTitle,
				},
				{
					provide: META_REDUCERS,
					useFactory: META_REDUCERS_FACTORY,
					deps: [IS_PRODUCTION],
					multi: true,
				},
				META_REDUCERS_PROVIDERS,
			],
		};
	}

	constructor(
		@Inject(CORE_BUILDER)
		configure: (builder: CoreLibModuleBuilder) => void,
		endpointManager: EndpointManagerService,
		handlerService: HandlerService
	) {
		const builder = new CoreLibModuleBuilder();
		configure(builder);

		const built = builder.build();
		endpointManager.registerEndpoints(built.endpoints);
		handlerService.registerHandlers(built.handlers);
	}
}
