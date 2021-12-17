import { createReducer, on } from '@ngrx/store';
import { EmployeesAction } from './employees.actions';
import { IEmployeesState } from '../interfaces/employees-state.interface';
import { InferAction } from '@core/common';

export module EmployeesReducer {
	export const EMPLOYEES_FEATURE_KEY = 'employees';

	export interface EmployeesPartialState {
		readonly [EMPLOYEES_FEATURE_KEY]: IEmployeesState;
	}

	export const initialState: IEmployeesState = {
		cv: null,
		ids: [],
		isLoading: true,
		loaded: false,
		isDownloaded: false,
	};

	export const reducer = createReducer<IEmployeesState, InferAction<EmployeesAction>>(
		initialState,
		on(EmployeesAction.setUsers, (state, { payload }) => {
			return {
				...state,
				ids: payload,
				isLoading: false,
				loaded: true,
			};
		}),
		on(EmployeesAction.reset, () => {
			return {
				...initialState,
			};
		}),
		on(EmployeesAction.search, (state) => {
			return {
				...state,
				isLoading: true,
			};
		}),
		on(EmployeesAction.download, (state, { payload }) => ({
			...state,
			cv: payload,
			isDownloaded: false,
			loaded: false,
		})),

		on(EmployeesAction.loaded, (state) => ({
			...state,
			isLoading: false,
			loaded: true,
			isDownloaded: true,
		}))
	);
}
