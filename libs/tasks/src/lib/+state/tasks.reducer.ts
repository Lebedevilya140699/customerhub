import { ITasksState } from '../interfaces';
import { createReducer, on } from '@ngrx/store';
import { InferAction } from '@core/common';
import { TasksAction } from './tasks.actions';

export module TasksReducer {
	export const TASKS_FEATURE_KEY = 'tasks';

	export interface TasksPartialState {
		readonly [TASKS_FEATURE_KEY]: ITasksState;
	}

	export const initialState: ITasksState = {
		isLoading: false,
		loaded: false,
		taskIds: [],
		selectedTaskId: null,
	};

	export const reducer = createReducer<ITasksState, InferAction<TasksAction>>(
		initialState,
		on(TasksAction.setTasks, (state, { payload }) => ({
			...state,
			taskIds: payload,
		})),
		on(TasksAction.setId, (state, { payload }) => ({
			...state,
			selectedTaskId: payload,
		}))
	);
}
