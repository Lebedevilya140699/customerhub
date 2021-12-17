import { Injectable } from '@angular/core';
import { BaseDataService, HttpService } from '@core/http';
import { User, Users } from '@core/domain';
import { HttpClient } from '@angular/common/http';
import { DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { ResumeResponse, UserResponse, UsersResponse } from '@core/platform';
import { map, tap } from 'rxjs/operators';
import { UserCollectionService } from './user-collection.service';
import { HttpMethod, Map } from '@core/common';
import { UserEndpoints } from '../enums/user-endpoints.enum';
import { Resume } from '@core/domain';
import { ResumeCollectionService } from './resume-collection.service';

@Injectable()
export class UserService extends BaseDataService<User> {
	constructor(
		http: HttpClient,
		httpUrlGenerator: HttpUrlGenerator,
		config: DefaultDataServiceConfig,
		httpService: HttpService,
		private readonly userCollectionService: UserCollectionService,
		private readonly resumeCollectionService: ResumeCollectionService
	) {
		super('User', http, httpUrlGenerator, config, httpService);
	}

	//@ts-ignore
	public getById(id: number): Observable<User> {
		return super.getById<UserResponse>(id).pipe(
			Map(User, UserResponse),
			tap((user: User) => {
				this.userCollectionService.upsertOneInCache(user);
			})
		);
	}

	public getResumeById(id: number): Observable<Resume> {
		return super
			.execute<ResumeResponse>(HttpMethod.GET, UserEndpoints.GET_CV, undefined, {
				pathArgs: [id],
			})
			.pipe(
				Map(Resume, ResumeResponse),
				tap((x: Resume) => {
					this.resumeCollectionService.upsertOneInCache(x);
				})
			);
	}

	public getAll(): Observable<User[]> {
		return this.execute<UsersResponse>(HttpMethod.GET, UserEndpoints.GET_ALL).pipe(
			Map(Users, UsersResponse),
			map((x: Users) => x.items!),
			tap((x) => {
				this.userCollectionService.upsertManyInCache(x);
			})
		);
	}

	public search(term: string): Observable<User[]> {
		return this.execute<UsersResponse>(HttpMethod.GET, UserEndpoints.SEARCH, undefined, {
			params: { searchString: term },
		}).pipe(
			Map(Users, UsersResponse),
			map((x) => x.items!),
			tap((x) => this.userCollectionService.upsertManyInCache(x))
		);
	}

	public approveResume(id: number): Observable<number> {
		return this.execute(HttpMethod.PUT, UserEndpoints.APPROVE_CV, undefined, {
			pathArgs: [id],
		});
	}
}
