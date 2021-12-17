import { Injectable, Injector } from '@angular/core';
import { DataAccessEffect, filterNil, InferAction, takeNotNil } from '@core/common';
import { HttpService } from '@core/http';
import { TasksReducer } from './tasks.reducer';
import { TasksAction } from './tasks.actions';
import { DataPersistence } from '@nrwl/angular';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect } from '@ngrx/effects';
import { TasksComponent } from '@core/tasks';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { TasksCollectionService } from '../services/tasks-collection.service';
import { concatMap, map, mapTo, tap } from 'rxjs/operators';
import { Task } from '@core/domain';
import { TaskViewComponent } from '../components/tasks-view/task-view.component';
import { String } from 'typescript-string-operations';
import { of, throwError } from 'rxjs';
import { UserService } from '@core/user';

@Injectable()
export class TasksEffect extends DataAccessEffect<
	TasksReducer.TasksPartialState,
	TasksAction,
	HttpService
> {
	loadTasks$ = createEffect(() => {
		return this.dataPersistence.navigation(TasksComponent, {
			run: (_a: ActivatedRouteSnapshot, _s: TasksReducer.TasksPartialState) => {
				return this.tasksService.getAll().pipe(
					takeNotNil(1),
					map((tasks: Task[]) => tasks.map((x) => x.id!)),
					filterNil,
					map((ids: number[]) => TasksAction.setTasks({ payload: ids }))
				);
			},
			onError: (_a, _e) => {
				return this._handleError(_e, _a);
			},
		});
	});

	navigateTaskView$ = createEffect(() => {
		return this.dataPersistence.navigation(TaskViewComponent, {
			run: (a: ActivatedRouteSnapshot, _s?: TasksReducer.TasksPartialState) => {
				let id: number | string | null = a.paramMap.get('id');

				if (!id || String.IsNullOrWhiteSpace(id)) {
					return throwError(new Error('Task number id not set'));
				} else {
					try {
						id = parseInt(id, 10);

						return TasksAction.setId({ payload: id });
					} catch (e) {
						return throwError(new Error('Task id must be a number'));
					}
				}
			},
			onError: (_a, _e) => {
				return this._handleError(_e, _a);
			},
		});
	});

	selectTask$ = createEffect(() => {
		return this.dataPersistence.fetch(TasksAction.TasksActions.SET_ID, {
			run: (a: InferAction<TasksAction.setId>, _s?: TasksReducer.TasksPartialState) => {
				return this.tasksCollectionService.tasks([a.payload]).pipe(
					concatMap((data) =>
						data.length === 0 ? this.tasksService.getAll() : of(data)
					),
					map((tasks: Task[]) => tasks.map((x) => x.id!).filter((x) => x === a.payload)),
					map((ids) => TasksAction.setTasks({ payload: ids }))
				);
			},
			onError: (_a, _e) => {
				return this._handleError(_e, _a);
			},
		});
	});

	approve$ = createEffect(() => {
		return this.dataPersistence.fetch(TasksAction.TasksActions.APPROVE_CV, {
			run: (a: InferAction<TasksAction.approveCv>, _s: TasksReducer.TasksPartialState) => {
				return this.httpService
					.consume(a.payload)
					.asObservable()
					.pipe(mapTo(TasksAction.reset())) as any;
			},
			onError: (_a, _e) => {
				return this._handleError(_e, _a);
			},
		});
	});

	constructor(
		dataPersistence: DataPersistence<TasksReducer.TasksPartialState>,
		store$: Store<TasksReducer.TasksPartialState>,
		actions$: Actions<TasksAction>,
		injector: Injector,
		private readonly httpService: HttpService,
		private readonly router: Router,
		private readonly tasksService: TasksService,
		private readonly tasksCollectionService: TasksCollectionService,
		private readonly userService: UserService
	) {
		super(dataPersistence, store$, actions$, httpService, injector);
	}
}
