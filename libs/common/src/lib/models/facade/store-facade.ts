import { Constructible } from '@nartc/automapper';
import { MemoizedSelector, MemoizedSelectorWithProps, select, Store } from '@ngrx/store';
import { FunctionWithParametersType } from '@ngrx/store/src/models';
import { BaseActionMap } from '../../interfaces/action/base-action-map';
import { BaseQueryMap } from '../../interfaces/query/base-query-map';
import { BaseAction } from '../action/base-action';

export class StoreFacade<
	TPartialState,
	TState,
	TActionType extends string,
	TAction extends BaseAction<TActionType>,
	TQueryMap extends BaseQueryMap<TPartialState, TState> = BaseQueryMap<TPartialState, TState>,
	TActionMap extends BaseActionMap<TActionType, TAction> = BaseActionMap<TActionType, TAction>
> {
	[key: string]: any;

	protected constructor(
		protected readonly store: Store<TPartialState>,
		queryMap: TQueryMap,
		actionMap: TActionMap,
		protected readonly featureKey?: keyof TPartialState
	) {
		Object.keys(actionMap).forEach((k) => {
			if (!actionMap.hasOwnProperty(k) || this.hasOwnProperty(k)) return;

			const action:
				| Constructible<TAction>
				| FunctionWithParametersType<any> = (actionMap as any)[k];

			const actionDispatcher = (...args: any[]) => {
				if (action instanceof BaseAction) {
					return new (action as Constructible<TAction>)(...args);
				}

				return (action as Function)(...args);
			};

			this[k] = (...args: any[]) => store.dispatch(actionDispatcher(...args));
		});

		Object.keys(queryMap).forEach((k) => {
			if (!queryMap.hasOwnProperty(k)) return;

			if (k.startsWith('select')) {
				const selector = (queryMap as any)[k] as MemoizedSelector<any, any>;
				let name = k.replace('select', '');
				name = name.substring(0, 1).toLowerCase() + name.substring(1) + '$';

				if (this.hasOwnProperty(name)) return;

				this[name] = store.pipe(select(selector));
			} else if (k.startsWith('get')) {
				const selector = (queryMap as any)[k] as MemoizedSelectorWithProps<any, any, any>;

				if (this.hasOwnProperty(k)) return;

				this[k] = (props: any) => store.pipe(select(selector, props));
			}
		});
	}
}
