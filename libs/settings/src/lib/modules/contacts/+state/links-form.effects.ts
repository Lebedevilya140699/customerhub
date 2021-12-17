import { Injectable, Injector } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { DataAccessEffect, filterNil, Map, removeNullProperties, takeNotNil } from '@core/common';
import { HttpService } from '@core/http';
import { LinksForm, ResumeRequest, ResumeResponse } from '@core/platform';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { ResumeCollectionService } from '@core/user';
import { SessionFacade } from '@core/session';
import { Resume } from '@core/domain';
import { Mapper } from '@nartc/automapper';
import * as R from 'ramda';
import { LinksFormReducer } from './links-form.reducer';
import { LinksFormAction } from './links-form.actions';

@Injectable()
export class LinksFormEffects extends DataAccessEffect<
	LinksFormReducer.LinksFormPartialState,
	LinksFormAction,
	HttpService
> {
	public submitLinks$ = createEffect(() => {
		return this.dataPersistence.fetch(LinksFormAction.LinksFormActions.SUBMIT_ASYNC, {
			id: () => null,
			run: (
				action: LinksFormAction.SubmitAsync,
				state: LinksFormReducer.LinksFormPartialState
			) => {
				let formValue: LinksForm = Object.assign(
					new LinksForm(),
					state[LinksFormReducer.LINKS_FORM_FEATURE_KEY].value
				);

				return this.session.userId$.pipe(
					switchMap((x) => this.resumeCollectionService.resume(x!)),
					takeNotNil(1),
					//@ts-ignore
					switchMap((resume: Resume) => {
						if (Array.isArray(resume.contactInfo?.links)) {
							resume.contactInfo!.links?.push(formValue.link!);
						} else {
							resume.contactInfo!.links = [formValue.link!];
						}

						action.payload.consumer.withBody(resume);

						return this.service.consume(action.payload.consumer).pipe(
							filterNil,
							Map(Resume, ResumeResponse),
							map((resume: Resume) => {
								this.resumeCollectionService.removeOneFromCache(resume);
								this.resumeCollectionService.upsertOneInCache(resume);

								return new LinksFormAction.ResetForm();
							})
						);
					})
				);
			},
			onError: (_a, e) => this._handleError(e),
		});
	});

	public deleteLink$ = createEffect(() => {
		return this.dataPersistence.fetch(LinksFormAction.LinksFormActions.DELETE_LINK, {
			id: () => null,
			run: (
				action: LinksFormAction.DeleteLink,
				state: LinksFormReducer.LinksFormPartialState
			) => {
				let formValue: LinksForm = Object.assign(
					new LinksForm(),
					state[LinksFormReducer.LINKS_FORM_FEATURE_KEY].value
				);

				return this.session.userId$.pipe(
					switchMap((x) => this.resumeCollectionService.resume(x!)),
					takeNotNil(1),
					switchMap((resume: Resume) => {
						if (Array.isArray(resume.contactInfo?.links)) {
							resume.contactInfo!.links = resume.contactInfo?.links.filter(
								(_x, i) => i !== action.payload.body
							);
						} else {
							resume.contactInfo!.links = null;
						}

						action.payload.consumer.withBody(resume);

						return this.service.consume(action.payload.consumer).pipe(
							takeNotNil(1),
							Map(Resume, ResumeResponse),
							map((resume: Resume) => {
								this.resumeCollectionService.removeOneFromCache(resume);
								this.resumeCollectionService.upsertOneInCache(resume);

								return new LinksFormAction.Submitted({
									value: formValue,
								});
							})
						);
					})
				);
			},
			onError: (_a, e) => this._handleError(e),
		});
	});

	constructor(
		dataPersistence: DataPersistence<LinksFormReducer.LinksFormPartialState>,
		store$: Store<LinksFormReducer.LinksFormPartialState>,
		actions$: Actions<LinksFormAction>,
		service: HttpService,
		injector: Injector,
		private readonly resumeCollectionService: ResumeCollectionService,
		private readonly session: SessionFacade
	) {
		super(dataPersistence, store$, actions$, service, injector);
	}
}
