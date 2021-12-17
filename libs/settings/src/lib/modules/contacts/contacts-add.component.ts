import { Component } from '@angular/core';
import { CurtainRef } from '@core/curtain';
import { SettingsFacade } from '../../+state/settings.facade';
import { FormComponent, FormValidator } from '@core/common';
import { LinksForm } from '@core/platform';
import { take } from 'rxjs/operators';
import { LinksFormReducer } from './+state/links-form.reducer';
import { LinksFormAction } from './+state/links-form.actions';
import { LinksFormFacade } from './+state/links-form.facade';

@Component({
	selector: 'hh-contacts-add',
	templateUrl: './contacts-add.component.html',
})
export class ContactsAddComponent extends FormComponent<
	LinksFormReducer.LinksFormPartialState,
	LinksForm,
	LinksFormAction.LinksFormActions,
	LinksFormAction,
	LinksFormFacade
> {
	public isLoading = false;

	constructor(
		formFacade: LinksFormFacade,
		validator: FormValidator,
		public readonly curtain: CurtainRef,
		public readonly formValidator: FormValidator,
		public readonly linksFormFacade: LinksFormFacade
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

			this.linksFormFacade.submitLinks().subscribe(
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

	public cancel() {
		this.curtain.close();
	}
}
