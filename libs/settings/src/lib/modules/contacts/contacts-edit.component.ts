import { Component } from '@angular/core';
import { CurtainRef } from '@core/curtain';
import { FormComponent, FormValidator } from '@core/common';
import { ContactsForm } from '@core/platform';
import { take } from 'rxjs/operators';
import { ContactsFormReducer } from './+state/contacts-form.reducer';
import { ContactsFormFacade } from './+state/contacts-form.facade';
import { ContactsFormAction } from './+state/contacts-form.actions';

@Component({
	selector: 'hh-contacts-edit',
	templateUrl: './contacts-edit.component.html',
})
export class ContactsEditComponent extends FormComponent<
	ContactsFormReducer.ContactsFormPartialState,
	ContactsForm,
	ContactsFormAction.ContactsFormActions,
	ContactsFormAction,
	ContactsFormFacade
> {
	public isLoading = false;

	constructor(
		formFacade: ContactsFormFacade,
		validator: FormValidator,
		public readonly curtain: CurtainRef
	) {
		super(formFacade, validator);
	}

	public save() {
		this.isLoading = true;
		this.formIsInvalidAsync$.pipe(take(1)).subscribe((x) => {
			if (x) {
				this.isLoading = false;

				return;
			}

			this.formFacade.submitContacts().subscribe(
				() => {
					this.curtain.close();
					this.isLoading = false;
				},
				() => {
					this.isLoading = false;
				},
				() => {
					this.isLoading = false;
				}
			);
		});
	}
}
