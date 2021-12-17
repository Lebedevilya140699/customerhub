import { MemoizedSelector } from '@ngrx/store';

export interface BaseQueryMap<TPartialState, TState> {
	selectState?: MemoizedSelector<TPartialState, TState>;
}
