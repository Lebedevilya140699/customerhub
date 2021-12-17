import { Component } from '@angular/core';
import { CurtainRef } from '@core/curtain';
import { FormComponent, FormValidator } from '@core/common';
import { CertificateForm, ResumeForm } from '@core/platform';
import { take } from 'rxjs/operators';
import { CertificateFormReducer } from './+state/certificates-form.reducer';
import { CertificateFormAction } from './+state/certificates-form.actions';
import { CertificateFormFacade } from './+state/certificates-form.facade';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { NgrxValueConverters } from 'ngrx-forms';

@Component({
	selector: 'hh-certificates-add',
	templateUrl: './certificates-add.component.html',
})
export class CertificatesAddComponent extends FormComponent<
	CertificateFormReducer.CertificateFormPartialState,
	CertificateForm,
	CertificateFormAction.CertificateFormActions,
	CertificateFormAction,
	CertificateFormFacade
> {
	public readonly dateValueConverter = NgrxValueConverters.dateToISOString;
	public isLoading = false;

	constructor(
		formFacade: CertificateFormFacade,
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

			this.formFacade.submitCertificate().subscribe(
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
