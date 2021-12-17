import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreFacade, where } from '@core/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { INavigationState, Navigation } from '../interfaces/navigation-state';
import { HISTORY_FILTER } from '../tokens/history-filter';
import { NavigationAction } from './navigation.action';
import { NavigationReducer } from './navigation.reducer';
import { NavigationQuery } from './navigation.selectors';

export interface NavigationFacade {
	readonly history$: Observable<Navigation[]>;
	readonly lastAction$: Observable<Navigation>;
	readonly lastPath$: Observable<string>;
	readonly lastCode$: Observable<string>;

	reset(): void;
	setFilter(filter: RegExp | null): void;
}

@Injectable()
export class NavigationFacade extends StoreFacade<
	NavigationReducer.NavigationPartialState,
	INavigationState,
	NavigationAction.NavigationActions,
	NavigationAction
> {
	public readonly filteredHistory$: Observable<Navigation[]> = this.history$.pipe(
		where((x) => (!!this.filter ? !this.filter.test(x.code) : true))
	);
	public readonly filteredLastAction$: Observable<Navigation | null> = this.filteredHistory$.pipe(
		map((x) => (x.length > 0 ? x[0] : null))
	);
	public readonly filteredLastPath$: Observable<string | null> = this.filteredLastAction$.pipe(
		map((x) => x?.path ?? null)
	);
	public readonly filteredLastCode$: Observable<string | null> = this.filteredLastAction$.pipe(
		map((x) => x?.path ?? null)
	);

	constructor(
		store: Store<NavigationReducer.NavigationPartialState>,
		@Inject(HISTORY_FILTER) private readonly filter: RegExp | null
	) {
		super(
			store,
			NavigationQuery.map,
			NavigationAction.map,
			NavigationReducer.NAVIGATION_FEATURE_KEY
		);
	}
}
