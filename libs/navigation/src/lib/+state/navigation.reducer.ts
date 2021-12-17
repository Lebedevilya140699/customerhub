import { routerNavigatedAction } from '@ngrx/router-store';
import { createReducer, on } from '@ngrx/store';
import { String } from 'typescript-string-operations';
import { INavigationState } from '../interfaces/navigation-state';
import { NavigationAction } from './navigation.action';

export module NavigationReducer {
	export const NAVIGATION_FEATURE_KEY = 'navigation';

	export interface NavigationPartialState {
		readonly [NAVIGATION_FEATURE_KEY]: INavigationState;
	}

	export const initialState: INavigationState = {
		history: [],
		counter: 0,
	};

	const reg: RegExp = /\?.*/;

	export const reducer = createReducer<INavigationState>(
		initialState,
		on(routerNavigatedAction, (state, { payload }) => {
			const split = payload.event.urlAfterRedirects
				.replace(reg, '')
				.split('/', 3)
				.filter((x) => !!x && !String.IsNullOrWhiteSpace(x));

			const code = split.join('.');
			const counter = state.counter + 1;

			return {
				history: [
					{
						path: payload.event.urlAfterRedirects,
						code: code,
						icon: split[split.length - 1],
						id: state.counter,
					},
					...state.history.filter((x) => x.code !== code),
				],
				counter,
			};
		}),
		on(NavigationAction.reset, () => initialState)
	);
}
