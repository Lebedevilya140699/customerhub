import {
	BaseActionMap,
	createPayloadAction,
	HttpConsumer,
	InferAction,
	PayloadActionCreator,
} from '@core/common';
import { ActionCreator, createAction } from '@ngrx/store';
import { EmployeesAction } from '../../../../employees/src/lib/+state/employees.actions';

export module TasksAction {
	export enum TasksActions {
		LOAD_TASKS = '[Tasks] Load Tasks',
		SET_ID = '[Tasks] Set ID',
		SET_TASKS = '[Tasks] Set Tasks',
		RESET = '[Tasks] Reset',
		APPROVE_CV = '[Tasks] Approve CV',
	}

	export interface loadTasks extends ActionCreator<TasksActions.LOAD_TASKS> {}
	export interface setId extends PayloadActionCreator<TasksActions.SET_ID, number> {}
	export interface setTasks extends PayloadActionCreator<TasksActions.SET_TASKS, number[]> {}
	export interface reset extends ActionCreator<TasksActions.RESET> {}
	export interface approveCv
		extends PayloadActionCreator<TasksActions.APPROVE_CV, HttpConsumer<any, any>> {}

	export const loadTasks: loadTasks = createAction(TasksActions.LOAD_TASKS);
	export const setId: setId = createPayloadAction(TasksActions.SET_ID);
	export const setTasks: setTasks = createPayloadAction(TasksActions.SET_TASKS);
	export const reset: reset = createAction(TasksActions.RESET);
	export const approveCv: approveCv = createPayloadAction(TasksActions.APPROVE_CV);

	export interface Map extends BaseActionMap<TasksActions, InferAction<TasksAction>> {
		loadTasks: loadTasks;
		setId: setId;
		setTasks: setTasks;
		reset: reset;
		approveCv: approveCv;
	}

	export const map: Map = {
		loadTasks,
		setId,
		setTasks,
		reset,
		approveCv,
	};
}

export type TasksAction = TasksAction.setTasks | TasksAction.reset | TasksAction.approveCv;
