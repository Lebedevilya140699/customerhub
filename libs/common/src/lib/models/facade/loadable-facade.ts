import { createSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseActionMap } from '../../interfaces/action';
import { ILoadable } from '../../interfaces/loadable';
import { LoadableQueryMap } from '../../interfaces/query';
import { BaseAction } from '../action';
import { BaseError } from '../error';
import { BaseFacade } from './base-facade';

/**
 * Abstract facade with isLoading, loaded and error properties to provide loadable states
 * @typeparam TPartialState - Store Partial State
 * @typeparam TError - Generic Error type
 */
export abstract class LoadableFacade<
	TPartialState,
	TState extends ILoadable,
	TActionType extends string,
	TAction extends BaseAction<TActionType>,
	TQueryMap extends LoadableQueryMap<TPartialState, TState> = LoadableQueryMap<
		TPartialState,
		TState
	>,
	TActionMap extends BaseActionMap<TActionType, TAction> = BaseActionMap<TActionType, TAction>,
	TError extends BaseError = BaseError
> extends BaseFacade<TPartialState, TState, TActionType, TAction, TQueryMap, TActionMap> {
	/**
	 * Is models loading
	 */
	public readonly isLoading$: Observable<boolean>;

	/**
	 * Is models loaded
	 */
	public readonly loaded$: Observable<boolean>;

	/**
	 * Error that occurred loading models
	 */
	public readonly error$: Observable<TError>;

	/**
	 * Injection of store and selectors for isLoading, loaded and error
	 * @param store - Store provider
	 * @param featureKey
	 * @param actionMap
	 * @param queryMap
	 */
	protected constructor(
		protected readonly store: Store<TPartialState>,
		featureKey: keyof TPartialState,
		actionMap?: TActionMap,
		queryMap?: TQueryMap
	) {
		super(store, queryMap, actionMap, featureKey);
		const selectorMap: TQueryMap = queryMap ?? ({} as TQueryMap);
		if (!selectorMap.isLoadingQuery) {
			selectorMap.isLoadingQuery = createSelector(
				this.queryMap.selectState!,
				(state: TState) => state.isLoading
			);
		}
		this.isLoading$ = this.store.pipe(select(selectorMap.isLoadingQuery));

		if (!selectorMap.loadedQuery) {
			selectorMap.loadedQuery = createSelector(
				this.queryMap.selectState!,
				(state: TState) => state.loaded
			);
		}
		this.loaded$ = this.store.pipe(select(selectorMap.loadedQuery));

		if (!selectorMap.errorQuery) {
			selectorMap.errorQuery = createSelector(
				this.queryMap.selectState!,
				(state: TState) => state.error
			);
		}
		this.error$ = this.store.pipe(select(selectorMap.errorQuery));
	}
}
