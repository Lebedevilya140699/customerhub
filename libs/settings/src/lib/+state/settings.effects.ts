import { Injectable, Injector } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { DataAccessEffect, removeNullProperties, takeNotNil, Map } from '@core/common';
import { HttpService } from '@core/http';
import { ResumeForm, ResumeRequest, ResumeResponse } from '@core/platform';
import { SettingsReducer } from './settings.reducer';
import { SettingsAction } from './settings.actions';
import { map, switchMap } from 'rxjs/operators';
import { ResumeCollectionService } from '@core/user';
import { SessionFacade } from '@core/session';
import { Resume } from '@core/domain';
import { Mapper } from '@nartc/automapper';
import * as R from 'ramda';

@Injectable()
export class SettingsEffects extends DataAccessEffect<
	SettingsReducer.SettingsPartialState,
	SettingsAction,
	HttpService
> {
	public submitAsync$ = createEffect(() => {
		return this.dataPersistence.fetch(SettingsAction.SettingsActions.SUBMIT_ASYNC, {
			run: (
				action: SettingsAction.SubmitAsync,
				state: SettingsReducer.SettingsPartialState
			) => {
				const formValue: ResumeForm = Object.assign(
					new ResumeForm(),
					state[SettingsReducer.SETTINGS_FEATURE_KEY].value
				);

				return this.session.userId$.pipe(
					switchMap((x) => this.resumeCollectionService.resume(x!)),
					takeNotNil(1),
					//@ts-ignore
					switchMap((resume: Resume) => {
						const mappedForm = removeNullProperties(Mapper.map(formValue, Resume));

						const body = Mapper.map(
							R.mergeDeepRight<Resume, Resume>(resume, mappedForm),
							ResumeRequest,
							Resume
						);

						action.payload.consumer.withBody(body);

						return this.service.consume(action.payload.consumer).pipe(
							takeNotNil(1),
							Map(Resume, ResumeResponse),
							map((resume: Resume) => {
								this.resumeCollectionService.updateOneInCache(resume);

								return new SettingsAction.Submitted({
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
		dataPersistence: DataPersistence<SettingsReducer.SettingsPartialState>,
		store$: Store<SettingsReducer.SettingsPartialState>,
		actions$: Actions<SettingsAction>,
		service: HttpService,
		injector: Injector,
		private readonly resumeCollectionService: ResumeCollectionService,
		private readonly session: SessionFacade
	) {
		super(dataPersistence, store$, actions$, service, injector);
	}
}
