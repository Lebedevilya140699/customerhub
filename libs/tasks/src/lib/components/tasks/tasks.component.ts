import { Component, OnInit } from '@angular/core';
import { IBreadcrumbs } from '@core/breadcrumbs';
import { UserCollectionService } from '@core/user';
import { SessionFacade } from '@core/session';
import { mergeMap, switchMap } from 'rxjs/operators';
import { filterNil, takeNotNil } from '@core/common';
import { Task, User } from '@core/domain';
import { Observable } from 'rxjs';
import { TasksCollectionService } from '../../services/tasks-collection.service';
import { TasksFacade } from '../../+state/tasks.facade';
import { Router } from '@angular/router';

@Component({
	selector: 'hh-tasks',
	templateUrl: './tasks.component.html',
})
export class TasksComponent {
	public breadcrumbs: IBreadcrumbs[] = [
		{
			displayValue: 'Dashboard',
			leading: false,
			route: '/',
		},
		{
			displayValue: 'Tasks',
			leading: true,
		},
	];
	public tasks$: Observable<Task[]>;

	public taskType = 'Approve CV';

	constructor(
		private readonly sessionFacade: SessionFacade,
		private readonly tasksFacade: TasksFacade,
		private readonly tasksCollectionService: TasksCollectionService,
		private readonly router: Router
	) {
		this.tasks$ = this.tasksFacade.taskIds$.pipe(
			filterNil,
			switchMap((ids: number[]) => this.tasksCollectionService.tasks(ids))
		);
	}

	public selectTask(taskId: number) {
		this.tasksFacade.selectTask(taskId);

		this.router.navigateByUrl(`/tasks/task/${taskId}`);
	}
}
