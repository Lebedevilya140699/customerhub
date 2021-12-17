import { Component, OnDestroy } from '@angular/core';
import { IBreadcrumbs } from '@core/breadcrumbs';
import { TasksCollectionService } from '../../services/tasks-collection.service';
import { TasksFacade } from '../../+state/tasks.facade';
import { Observable, Subscription } from 'rxjs';
import { Task, User } from '@core/domain';
import { filterNil, HttpConsumer, takeNotNil } from '@core/common';
import { switchMap, take, tap } from 'rxjs/operators';
import { UserEndpoints, UserService } from '@core/user';
import { ResumeRequest, ResumeResponse } from '@core/platform';
import { Router } from '@angular/router';

@Component({
	selector: 'hh-task-view',
	templateUrl: './task-view.component.html',
})
export class TaskViewComponent implements OnDestroy {
	public breadcrumbs: IBreadcrumbs[] = [
		{
			displayValue: 'Dashboard',
			leading: false,
			route: '/',
		},
		{
			displayValue: 'Tasks',
			leading: false,
			route: '/tasks',
		},
		{
			displayValue: '#149',
			leading: true,
		},
	];

	public readonly user$: Observable<User>;
	public readonly task$: Observable<Task>;
	private sub: Subscription = Subscription.EMPTY;

	constructor(
		private readonly tasksFacade: TasksFacade,
		private readonly router: Router,
		private readonly tasksCollectionService: TasksCollectionService,
		private readonly userService: UserService
	) {
		this.task$ = this.tasksFacade.selectedTaskId$.pipe(
			filterNil,
			switchMap((taskId: number | null) => this.tasksCollectionService.task(taskId!)),
			filterNil
		);
		this.user$ = this.task$.pipe(
			switchMap((task: Task | null) => this.userService.getById(task!.reporterId!)),
			filterNil
		);
	}

	public approve() {
		const consumer = new HttpConsumer<any, any>({
			endpoint: UserEndpoints.APPROVE_CV,
		});

		this.sub = this.task$.pipe(takeNotNil(1)).subscribe((task: Task) => {
			consumer.options.pathArgs = [Number(task.reporterId)];
			this.tasksFacade.approve(consumer);
		});

		consumer.pipe(take(1)).subscribe(() => {
			this.router.navigateByUrl('/tasks');
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
