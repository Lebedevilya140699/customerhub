import { Injectable, Injector } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { filter, map, mapTo, tap } from 'rxjs/operators';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EmployeesAction } from '../+state/employees.actions';
import { EmployeesComponent } from '../components/employees/employees.component';
import { EmployeesReducer } from '../+state/employees.reducer';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DataAccessEffect, FileUtils, InferAction, takeNotNil } from '@core/common';
import { HttpService } from '@core/http';
import { UserService } from '@core/user';
import { EmployeeEndpoints } from '@core/employees';
import { CvRequest } from '@core/platform';

@Injectable()
export class EmployeesEffects extends DataAccessEffect<
	EmployeesReducer.EmployeesPartialState,
	EmployeesAction,
	HttpService
> {
	public readonly loadEmployees$ = createEffect(() => {
		return this.dataPersistence.navigation(EmployeesComponent, {
			run: (_a: ActivatedRouteSnapshot, _s: EmployeesReducer.EmployeesPartialState) => {
				return this.userService.getAll().pipe(
					takeNotNil(1),
					map((res) => res.map((x) => x.id!)),
					map((res) => EmployeesAction.setUsers({ payload: res }))
				);
			},
			onError: (_a, _e) => {
				return this._handleError(_e, _a);
			},
		});
	});

	public readonly search$ = createEffect(() => {
		return this.dataPersistence.fetch(EmployeesAction.EmployeesActions.SEARCH, {
			run: (a: InferAction<EmployeesAction.search>, _s) =>
				this.userService.search(a.payload).pipe(
					takeNotNil(1),
					map((res) => EmployeesAction.setUsers({ payload: res.map((x) => x.id!) }))
				),
			onError: (_a, _e) => {
				return this._handleError(_e, _a);
			},
		});
	});

	download$ = createEffect(() => {
		return this.dataPersistence.fetch(EmployeesAction.EmployeesActions.DOWNLOAD, {
			id: () => null,
			run: (
				a: InferAction<EmployeesAction.download>,
				_state: EmployeesReducer.EmployeesPartialState
			) => {
				const body = Object.assign(new CvRequest(), {
					employeeIdList: a.payload.ids,
				});
				return this.httpService
					.download<Blob, CvRequest>(
						{
							endpoint: EmployeeEndpoints.DOWNLOAD,
							body: body,
						},
						({ result }) => {
							if (!!result) {
								FileUtils.download(result, 'archive.zip');
							}
						}
					)
					.pipe(
						filter((data) => data.state === 2),
						mapTo(EmployeesAction.loaded() as Action)
					);
			},
			onError: (_a, _e) => {
				return this._handleError(_e, _a);
			},
		});
	});

	constructor(
		dataPersistence: DataPersistence<EmployeesReducer.EmployeesPartialState>,
		store$: Store<EmployeesReducer.EmployeesPartialState>,
		actions$: Actions<EmployeesAction>,
		private readonly httpService: HttpService,
		injector: Injector,
		private readonly userService: UserService
	) {
		super(dataPersistence, store$, actions$, httpService, injector);
	}
}
