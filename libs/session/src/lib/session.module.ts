import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionFacade } from './+state/session.facade';
import { SessionService } from './services/session.service';
import { StoreModule } from '@ngrx/store';
import { SessionReducer } from './+state/session.reducer';
import { IInitializer, IInitializerFn, INITIALIZER } from './helpers/initialize';
import { _IS_AUTHORIZED, IS_AUTHORIZED, Resetter, RESETTERS } from './tokens';
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from './+state/session.effects';
import { SessionGuard } from './guards';

export interface IInitializerOptions {
	factory?: IInitializerFn;
	deps?: [];
	class?: Type<IInitializer>;
}

export interface SessionOptions {
	initializers?: IInitializerOptions[];
	resetters: Type<Resetter<any>>[];
}

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(SessionReducer.SESSION_FEATURE_KEY, SessionReducer.reducer),
		EffectsModule.forFeature([SessionEffects]),
	],
	providers: [SessionFacade, SessionService, SessionGuard],
})
export class SessionModule {
	/**
	 * Initializers are added as follows:
	 *
	 * * For factories
	 * ```
	 * {
	 *     factory: onAuthorized,
	 *     deps: [SomeService]
	 * }
	 * ```
	 * * For classes (Services, Facades, etc.)
	 * ```
	 * {
	 *     class: SomeService
	 * }
	 * ```
	 *
	 * @param options
	 */
	public static forRoot(options?: SessionOptions): ModuleWithProviders<SessionModule> {
		return {
			ngModule: SessionModule,
			providers: [
				{
					provide: IS_AUTHORIZED,
					useFactory: _IS_AUTHORIZED,
					deps: [SessionFacade],
				},
				{
					provide: RESETTERS,
					useValue: options?.resetters ?? [],
				},
				...(options?.initializers ?? []).map((x) => {
					if (x['factory']) {
						return {
							provide: INITIALIZER,
							useFactory: x.factory,
							deps: x.deps,
							multi: true,
						};
					}

					return {
						provide: INITIALIZER,
						useExisting: x.class,
						multi: true,
					};
				}),
			],
		};
	}
}
