import { MemoizedSelector } from '@ngrx/store';
import { ILoadable } from '../loadable';
import { BaseQueryMap } from './base-query-map';

export interface LoadableQueryMap<TPartialState, TState extends Partial<ILoadable>>
	extends BaseQueryMap<TPartialState, TState> {
	isLoadingQuery?: MemoizedSelector<TPartialState, boolean>;
	loadedQuery?: MemoizedSelector<TPartialState, boolean>;
	errorQuery?: MemoizedSelector<TPartialState, any>;
}
