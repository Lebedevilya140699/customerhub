import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { BaseQueryMap } from '@core/common';
import { INavigationState, Navigation } from '../interfaces/navigation-state';
import { NavigationReducer } from './navigation.reducer';

export module NavigationQuery {
	export const selectState = createFeatureSelector<
		NavigationReducer.NavigationPartialState,
		INavigationState
	>(NavigationReducer.NAVIGATION_FEATURE_KEY);

	export const selectHistory = createSelector(selectState, (state) => state.history);

	export const selectLastAction = createSelector(selectHistory, (history) => history[0]);

	export const selectLastPath = createSelector(selectLastAction, (last) => last?.path);

	export const selectLastCode = createSelector(selectLastAction, (last) => last?.code);

	export interface Map
		extends BaseQueryMap<NavigationReducer.NavigationPartialState, INavigationState> {
		selectHistory: MemoizedSelector<NavigationReducer.NavigationPartialState, Navigation[]>;
		selectLastAction: MemoizedSelector<NavigationReducer.NavigationPartialState, Navigation>;
		selectLastPath: MemoizedSelector<NavigationReducer.NavigationPartialState, string>;
		selectLastCode: MemoizedSelector<NavigationReducer.NavigationPartialState, string>;
	}

	export const map: Map = {
		selectState,
		selectHistory,
		selectLastAction,
		selectLastPath,
		selectLastCode,
	};
}
