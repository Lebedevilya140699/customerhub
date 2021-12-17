import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormFacade, HttpConsumer } from '@core/common';
import { ContactsForm, ResumeRequest, ResumeResponse } from '@core/platform';
import { ContactsFormReducer } from './contacts-form.reducer';
import { ContactsFormAction } from './contacts-form.actions';
import { switchMap, take } from 'rxjs/operators';
import { UserEndpoints } from '@core/user';
import { LinksFormAction } from './links-form.actions';
import { of } from 'rxjs';

@Injectable()
export class ContactsFormFacade extends FormFacade<
	ContactsFormReducer.ContactsFormPartialState,
	ContactsForm,
	ContactsFormAction.ContactsFormActions,
	ContactsFormAction
> {
	constructor(store: Store<ContactsFormReducer.ContactsFormPartialState>) {
		super(store, ContactsFormReducer.CONTACTS_FORM_FEATURE_KEY, {
			submitFormAction: ContactsFormAction.Submit,
			submittedFormAction: ContactsFormAction.Submitted,
			updateFormAction: ContactsFormAction.Update,
			submitFormAsyncAction: ContactsFormAction.SubmitAsync,
			addFormControlAction: ContactsFormAction.AddControl,
			removeFormControlAction: ContactsFormAction.RemoveControl,
			updateFormControlAction: ContactsFormAction.UpdateControl,
			reset: ContactsFormAction.ResetForm,
		});
	}

	public submitContacts(): HttpConsumer<ResumeResponse, ResumeRequest> {
		return this.formIsValid$.pipe(
			take(1),
			switchMap((isValid: boolean) => {
				if (!isValid) {
					this.store.dispatch(new LinksFormAction.UpdateFormState());

					return of();
				}

				const consumer = new HttpConsumer<ResumeResponse, ResumeRequest>({
					endpoint: UserEndpoints.UPDATE,
				});

				this.store.dispatch(
					new ContactsFormAction.SubmitAsync({
						consumer: consumer,
					})
				);

				return consumer;
			})
		) as HttpConsumer<ResumeResponse, ResumeRequest>;
	}
}
