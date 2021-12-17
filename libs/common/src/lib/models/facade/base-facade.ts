import { Constructible } from '@nartc/automapper';
import { createFeatureSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseActionMap } from '../../interfaces/action/base-action-map';
import { BaseQueryMap } from '../../interfaces/query/base-query-map';
import { BaseAction } from '../action';
import { isConstructor } from './is-constructor';

export interface BaseFacade<
	TPartialState,
	TState,
	TActionType extends string,
	TAction extends BaseAction<TActionType>,
	TQueryMap extends BaseQueryMap<TPartialState, TState> = BaseQueryMap<TPartialState, TState>,
	TActionMap extends BaseActionMap<TActionType, TAction> = BaseActionMap<TActionType, TAction>
> {
	reset(): void;
}

export abstract class BaseFacade<
	TPartialState,
	TState,
	TActionType extends string,
	TAction extends BaseAction<TActionType>,
	TQueryMap extends BaseQueryMap<TPartialState, TState> = BaseQueryMap<TPartialState, TState>,
	TActionMap extends BaseActionMap<TActionType, TAction> = BaseActionMap<TActionType, TAction>
> {
	public readonly state$: Observable<TState>;
	protected queryMap: TQueryMap;

	protected constructor(
		protected readonly store: Store<TPartialState>,
		queryMap?: TQueryMap,
		actionMap?: TActionMap,
		protected readonly featureKey?: keyof TPartialState
	) {
		if (!!actionMap) {
			const { reset } = actionMap;
			if (!!reset) {
				this.reset = () => {
					//@ts-ignore
					this.store.dispatch(
						isConstructor(reset)
							? new (reset as Constructible)()
							: (reset as Function)()
					);
				};
			}
		}
		const selectorMap: TQueryMap = queryMap ?? ({} as TQueryMap);
		if (!selectorMap.selectState) {
			if (!featureKey) {
				throw new Error('Feature key or state selector must be configured');
			}

			selectorMap.selectState = createFeatureSelector<TPartialState, TState>(featureKey);
		}
		this.state$ = this.store.pipe(select(selectorMap.selectState));
		this.queryMap = selectorMap;
	}
}
