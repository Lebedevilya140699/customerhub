import { Injectable, Injector } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { DataAccessEffect, Map, removeNullProperties, takeNotNil } from '@core/common';
import { HttpService } from '@core/http';
import { ContactsForm, ResumeForm, ResumeRequest, ResumeResponse } from '@core/platform';
import { map, switchMap } from 'rxjs/operators';
import { ResumeCollectionService } from '@core/user';
import { SessionFacade } from '@core/session';
import { Resume } from '@core/domain';
import { Mapper } from '@nartc/automapper';
import * as R from 'ramda';
import { LinksFormReducer } from './links-form.reducer';
import { LinksFormAction } from './links-form.actions';
import { ContactsFormAction } from './contacts-form.actions';
import { ContactsFormReducer } from './contacts-form.reducer';

@Injectable()
export class ContactsFormEffects extends DataAccessEffect<
	ContactsFormReducer.ContactsFormPartialState,
	ContactsFormAction,
	HttpService
> {
	public submitAsync$ = createEffect(() => {
		return this.dataPersistence.fetch(ContactsFormAction.ContactsFormActions.SUBMIT_ASYNC, {
			run: (
				action: ContactsFormAction.SubmitAsync,
				state: ContactsFormReducer.ContactsFormPartialState
			) => {
				const formValue: ContactsForm = Object.assign(
					new ContactsForm(),
					state[ContactsFormReducer.CONTACTS_FORM_FEATURE_KEY].value
				);

				return this.session.userId$.pipe(
					switchMap((x) => this.resumeCollectionService.resume(x!)),
					takeNotNil(1),
					switchMap((resume: Resume) => {
						const mappedForm = removeNullProperties(
							Mapper.map(formValue, Resume, ContactsForm)
						);

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

								return new ContactsFormAction.Submitted({
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
		dataPersistence: DataPersistence<ContactsFormReducer.ContactsFormPartialState>,
		store$: Store<ContactsFormReducer.ContactsFormPartialState>,
		actions$: Actions<ContactsFormAction>,
		service: HttpService,
		injector: Injector,
		private readonly resumeCollectionService: ResumeCollectionService,
		private readonly session: SessionFacade
	) {
		super(dataPersistence, store$, actions$, service, injector);
	}
}
