import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { EmployeesReducer } from './employees.reducer';
import { IEmployeesState } from '../interfaces/employees-state.interface';
import { BaseQueryMap } from '@core/common';

export module EmployeesSelector {
	export const selectState = createFeatureSelector<
		EmployeesReducer.EmployeesPartialState,
		IEmployeesState
	>(EmployeesReducer.EMPLOYEES_FEATURE_KEY);

	export const selectIds = createSelector(selectState, (state) => state.ids);
	export const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

	export const selectCv = createSelector<
		EmployeesReducer.EmployeesPartialState,
		IEmployeesState,
		string | null
	>(selectState, (state) => state.cv);

	export const selectDownloaded = createSelector<
		EmployeesReducer.EmployeesPartialState,
		IEmployeesState,
		boolean
	>(selectState, (state) => state.isDownloaded);

	export interface Map
		extends BaseQueryMap<EmployeesReducer.EmployeesPartialState, IEmployeesState> {
		selectIds: MemoizedSelector<EmployeesReducer.EmployeesPartialState, number[]>;
		selectCv: MemoizedSelector<EmployeesReducer.EmployeesPartialState, string | null>;
		selectDownloaded: MemoizedSelector<EmployeesReducer.EmployeesPartialState, boolean>;
	}

	export const map: Map = {
		selectIds,
		selectCv,
		selectDownloaded,
	};
}
