import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { BaseQueryMap } from '@core/common';
import { TasksReducer } from './tasks.reducer';
import { ITasksState } from '../interfaces';

export module TasksSelector {
	export const selectState = createFeatureSelector<TasksReducer.TasksPartialState, ITasksState>(
		TasksReducer.TASKS_FEATURE_KEY
	);

	export const selectIds = createSelector(selectState, (state) => state.taskIds);
	export const selectTaskId = createSelector(selectState, (state) => state.selectedTaskId);

	export interface Map extends BaseQueryMap<TasksReducer.TasksPartialState, ITasksState> {
		selectIds: MemoizedSelector<TasksReducer.TasksPartialState, number[]>;
		selectTaskId: MemoizedSelector<TasksReducer.TasksPartialState, number | null>;
	}

	export const map: Map = {
		selectIds,
		selectTaskId,
	};
}
