import { Component, Input } from '@angular/core';
import { Task, User } from '@core/domain';

@Component({
	selector: 'hh-task-card',
	templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
	@Input()
	set task(value: Task) {
		this._task = value;
	}

	get task(): Task {
		return this._task;
	}

	private _task: Task = {};

	public someFunction(e: any) {
		console.warn(e);
	}

	public anotherFunction(e: any) {
		console.warn(e);
	}
}
