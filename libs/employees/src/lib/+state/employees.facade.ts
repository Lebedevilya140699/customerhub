import { Injectable } from '@angular/core';
import { LoadableFacade } from '@core/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EmployeesAction } from './employees.actions';
import { EmployeesReducer } from './employees.reducer';
import { IEmployeesState } from '../interfaces/employees-state.interface';
import { EmployeesSelector } from './employees.selectors';

@Injectable()
export class EmployeesFacade extends LoadableFacade<
	EmployeesReducer.EmployeesPartialState,
	IEmployeesState,
	EmployeesAction.EmployeesActions,
	EmployeesAction
> {
	public readonly ids$: Observable<number[]>;
	public readonly isDownloaded$: Observable<boolean | null>;

	constructor(store: Store<EmployeesReducer.EmployeesPartialState>) {
		super(
			store,
			EmployeesReducer.EMPLOYEES_FEATURE_KEY,
			EmployeesAction.map,
			EmployeesSelector.map
		);
		this.ids$ = store.pipe(select(EmployeesSelector.selectIds));
		this.isDownloaded$ = store.pipe(select(EmployeesSelector.selectDownloaded));
	}

	downloadUserCv(ids: number[]) {
		this.store.dispatch(EmployeesAction.download({ payload: { ids } }));
	}

	isDownloadedUserCv(): Observable<any> {
		return this.store.select(EmployeesSelector.selectDownloaded);
	}
}
