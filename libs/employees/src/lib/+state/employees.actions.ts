import {
	BaseActionMap,
	createPayloadAction,
	InferAction,
	PayloadActionCreator,
} from '@core/common';
import { ActionCreator, createAction, props } from '@ngrx/store';

export module EmployeesAction {
	export enum EmployeesActions {
		SET_USERS = '[Employees] Set Users',
		RESET = '[Employees] Reset',
		SEARCH = '[Employees] Search',
		DOWNLOAD = '[Employees] Download CV',
		LOADED = '[Employees] Loaded',
	}

	export interface setUsers extends PayloadActionCreator<EmployeesActions.SET_USERS, number[]> {}
	export interface reset extends ActionCreator<EmployeesActions.RESET> {}
	export interface search extends PayloadActionCreator<EmployeesActions.SEARCH, string> {}
	export interface download
		extends PayloadActionCreator<EmployeesActions.DOWNLOAD, { ids: number[] }> {}
	export interface loaded extends ActionCreator<EmployeesActions.LOADED> {}

	export const download: download = createPayloadAction(EmployeesActions.DOWNLOAD);
	export const loaded: loaded = createAction(EmployeesActions.LOADED);
	export const setUsers: setUsers = createPayloadAction(EmployeesActions.SET_USERS);
	export const reset: reset = createAction(EmployeesActions.RESET);
	export const search: search = createPayloadAction(EmployeesActions.SEARCH);

	export interface Map extends BaseActionMap<EmployeesActions, InferAction<EmployeesAction>> {
		setUsers: setUsers;
		reset: reset;
		search: search;
		download: download;
		loaded: loaded;
	}

	export const map: Map = {
		setUsers,
		reset,
		search,
		download,
		loaded,
	};
}

export type EmployeesAction =
	| EmployeesAction.setUsers
	| EmployeesAction.reset
	| EmployeesAction.search
	| EmployeesAction.download
	| EmployeesAction.loaded;
