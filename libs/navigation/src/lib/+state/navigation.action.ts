import { createAction } from '@ngrx/store';
import { BaseAction, BaseActionMap } from '@core/common';

export module NavigationAction {
	export enum NavigationActions {
		RESET = '[Navigation] Reset',
	}

	export interface Reset extends BaseAction<NavigationActions.RESET> {}

	export const reset = createAction(NavigationActions.RESET);

	export interface Map extends BaseActionMap<NavigationActions, NavigationAction> {}

	export const map: Map = {
		reset,
	};
}

export type NavigationAction = NavigationAction.Reset;
