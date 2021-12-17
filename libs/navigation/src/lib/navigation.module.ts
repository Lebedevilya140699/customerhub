import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NavigationFacade } from './+state/navigation.facade';
import { NavigationReducer } from './+state/navigation.reducer';
import { INavigationOptions } from './interfaces/navigation-options';
import { HISTORY_FILTER } from './tokens/history-filter';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(
			NavigationReducer.NAVIGATION_FEATURE_KEY,
			NavigationReducer.reducer,
			{
				initialState: NavigationReducer.initialState,
			}
		),
	],
	providers: [NavigationFacade],
})
export class NavigationModule {
	public static forRoot(options?: INavigationOptions): ModuleWithProviders<NavigationModule> {
		return {
			ngModule: NavigationModule,
			providers: [
				{
					provide: HISTORY_FILTER,
					useValue: options?.filter ?? null,
				},
			],
		};
	}
}
