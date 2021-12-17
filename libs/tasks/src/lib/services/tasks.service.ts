import { Injectable } from '@angular/core';
import { BaseDataService, HttpService } from '@core/http';
import { Task, User, Users } from '@core/domain';
import { HttpClient } from '@angular/common/http';
import { DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import { ResumeCollectionService, UserCollectionService, UserEndpoints } from '@core/user';
import { TasksCollectionService } from './tasks-collection.service';
import { Observable } from 'rxjs';
import { TaskResponse, UsersResponse } from '@core/platform';
import { HttpMethod, Map, MapArray } from '@core/common';
import { map, tap } from 'rxjs/operators';
import { TasksEndpoints } from '../enums';

@Injectable()
export class TasksService extends BaseDataService<Task> {
	constructor(
		http: HttpClient,
		httpUrlGenerator: HttpUrlGenerator,
		config: DefaultDataServiceConfig,
		httpService: HttpService,
		private readonly tasksCollectionService: TasksCollectionService
	) {
		super('Tasks', http, httpUrlGenerator, config, httpService);
	}

	public getAll(): Observable<Task[]> {
		return this.execute<TaskResponse[]>(HttpMethod.GET, TasksEndpoints.LOAD_TASKS).pipe(
			MapArray(Task, TaskResponse),
			tap((x) => {
				this.tasksCollectionService.upsertManyInCache(x);
			})
		);
	}
}
