import { Injectable, Injector } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { DataAccessEffect, Map, takeNotNil } from '@core/common';
import { HttpService } from '@core/http';
import { ExperienceForm, ResumeResponse } from '@core/platform';
import { map, switchMap } from 'rxjs/operators';
import { ResumeCollectionService } from '@core/user';
import { SessionFacade } from '@core/session';
import { Resume, ResumeExperience } from '@core/domain';
import { ExperienceFormReducer } from './experience-form.reducer';
import { ExperienceFormAction } from './experience-form.actions';
import { Mapper } from '@nartc/automapper';

@Injectable()
export class ExperienceFormEffects extends DataAccessEffect<
	ExperienceFormReducer.ExperienceFormPartialState,
	ExperienceFormAction,
	HttpService
> {
	public submitAsync$ = createEffect(() => {
		return this.dataPersistence.fetch(ExperienceFormAction.ExperienceFormActions.SUBMIT_ASYNC, {
			run: (
				action: ExperienceFormAction.SubmitAsync,
				state: ExperienceFormReducer.ExperienceFormPartialState
			) => {
				const formValue: ExperienceForm = Object.assign(
					new ExperienceForm(),
					state[ExperienceFormReducer.EXPERIENCE_FORM_FEATURE_KEY].value
				);

				return this.session.userId$.pipe(
					switchMap((x) => this.resumeCollectionService.resume(x!)),
					takeNotNil(1),
					switchMap((resume: Resume) => {
						if (Array.isArray(resume.experiences)) {
							resume.experiences.push(Mapper.map(formValue, ResumeExperience));
						} else {
							resume.experiences = [Mapper.map(formValue, ResumeExperience)];
						}

						action.payload.consumer.withBody(resume);

						return this.service.consume(action.payload.consumer).pipe(
							takeNotNil(1),
							Map(Resume, ResumeResponse),
							map((resume: Resume) => {
								this.resumeCollectionService.removeOneFromCache(resume);
								this.resumeCollectionService.upsertOneInCache(resume);

								return new ExperienceFormAction.Submitted({
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

	public deleteExperience$ = createEffect(() => {
		return this.dataPersistence.fetch(
			ExperienceFormAction.ExperienceFormActions.DELETE_EXPERIENCE,
			{
				id: () => null,
				run: (
					action: ExperienceFormAction.DeleteExperience,
					state: ExperienceFormReducer.ExperienceFormPartialState
				) => {
					let formValue: ExperienceForm = Object.assign(
						new ExperienceForm(),
						state[ExperienceFormReducer.EXPERIENCE_FORM_FEATURE_KEY].value
					);

					return this.session.userId$.pipe(
						switchMap((x) => this.resumeCollectionService.resume(x!)),
						takeNotNil(1),
						switchMap((resume: Resume) => {
							if (Array.isArray(resume.experiences)) {
								resume.experiences = resume.experiences.filter(
									(_x, i) => i !== action.payload.body
								);
							} else {
								resume.experiences = null;
							}

							action.payload.consumer.withBody(resume);

							return this.service.consume(action.payload.consumer).pipe(
								takeNotNil(1),
								Map(Resume, ResumeResponse),
								map((resume: Resume) => {
									this.resumeCollectionService.removeOneFromCache(resume);
									this.resumeCollectionService.upsertOneInCache(resume);

									return new ExperienceFormAction.Submitted({
										value: formValue,
									});
								})
							);
						})
					);
				},
				onError: (_a, e) => this._handleError(e),
			}
		);
	});

	public updateExperience$ = createEffect(() => {
		return this.dataPersistence.fetch(
			ExperienceFormAction.ExperienceFormActions.UPDATE_EXPERIENCE,
			{
				id: () => null,
				run: (
					action: ExperienceFormAction.DeleteExperience,
					state: ExperienceFormReducer.ExperienceFormPartialState
				) => {
					let formValue: ExperienceForm = Object.assign(
						new ExperienceForm(),
						state[ExperienceFormReducer.EXPERIENCE_FORM_FEATURE_KEY].value
					);

					return this.session.userId$.pipe(
						switchMap((x) => this.resumeCollectionService.resume(x!)),
						takeNotNil(1),
						switchMap((resume: Resume) => {
							if (Array.isArray(resume.experiences)) {
								resume.experiences = resume.experiences.map((x, i) => {
									if (i === action.payload.body) {
										return Mapper.map(formValue, ResumeExperience);
									}

									return x;
								});
							} else {
								resume.experiences = null;
							}

							action.payload.consumer.withBody(resume);

							return this.service.consume(action.payload.consumer).pipe(
								takeNotNil(1),
								Map(Resume, ResumeResponse),
								map((resume: Resume) => {
									this.resumeCollectionService.removeOneFromCache(resume);
									this.resumeCollectionService.upsertOneInCache(resume);

									return new ExperienceFormAction.Submitted({
										value: formValue,
									});
								})
							);
						})
					);
				},
				onError: (_a, e) => this._handleError(e),
			}
		);
	});

	constructor(
		dataPersistence: DataPersistence<ExperienceFormReducer.ExperienceFormPartialState>,
		store$: Store<ExperienceFormReducer.ExperienceFormPartialState>,
		actions$: Actions<ExperienceFormAction>,
		service: HttpService,
		injector: Injector,
		private readonly resumeCollectionService: ResumeCollectionService,
		private readonly session: SessionFacade
	) {
		super(dataPersistence, store$, actions$, service, injector);
	}
}
