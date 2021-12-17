import { Injectable } from '@angular/core';
import { HttpConsumer, LoadableFacade } from '@core/common';
import { ITasksState } from '../interfaces';
import { TasksReducer } from './tasks.reducer';
import { TasksAction } from './tasks.actions';
import { select, Store } from '@ngrx/store';
import { TasksSelector } from './tasks.selector';
import { Observable } from 'rxjs';

@Injectable()
export class TasksFacade extends LoadableFacade<
	TasksReducer.TasksPartialState,
	ITasksState,
	TasksAction.TasksActions,
	TasksAction
> {
	public readonly taskIds$: Observable<number[]>;
	public readonly selectedTaskId$: Observable<number | null>;

	constructor(store: Store<TasksReducer.TasksPartialState>) {
		super(store, TasksReducer.TASKS_FEATURE_KEY, TasksAction.map, TasksSelector.map);

		this.taskIds$ = store.pipe(select(TasksSelector.selectIds));

		this.selectedTaskId$ = store.pipe(select(TasksSelector.selectTaskId));
	}

	public selectTask(id: number) {
		this.store.dispatch(TasksAction.setId({ payload: id }));
	}

	public approve(consumer: HttpConsumer) {
		this.store.dispatch(TasksAction.approveCv({ payload: consumer }));
	}
}
