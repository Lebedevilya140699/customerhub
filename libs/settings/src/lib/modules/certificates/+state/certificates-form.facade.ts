import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormFacade, HttpConsumer } from '@core/common';
import { CertificateForm, ResumeRequest, ResumeResponse } from '@core/platform';
import { switchMap, take } from 'rxjs/operators';
import { UserEndpoints } from '@core/user';
import { CertificateFormReducer } from './certificates-form.reducer';
import { CertificateFormAction } from './certificates-form.actions';
import { LinksFormAction } from '../../contacts/+state/links-form.actions';
import { of } from 'rxjs';

@Injectable()
export class CertificateFormFacade extends FormFacade<
	CertificateFormReducer.CertificateFormPartialState,
	CertificateForm,
	CertificateFormAction.CertificateFormActions,
	CertificateFormAction
> {
	constructor(store: Store<CertificateFormReducer.CertificateFormPartialState>) {
		super(store, CertificateFormReducer.CERTIFICATE_FORM_FEATURE_KEY, {
			submitFormAction: CertificateFormAction.Submit,
			submittedFormAction: CertificateFormAction.Submitted,
			updateFormAction: CertificateFormAction.Update,
			submitFormAsyncAction: CertificateFormAction.SubmitAsync,
			addFormControlAction: CertificateFormAction.AddControl,
			removeFormControlAction: CertificateFormAction.RemoveControl,
			updateFormControlAction: CertificateFormAction.UpdateControl,
			reset: CertificateFormAction.ResetForm,
		});
	}

	public submitCertificate(): HttpConsumer<ResumeResponse, ResumeRequest> {
		return this.formIsValid$.pipe(
			take(1),
			switchMap((isValid: boolean) => {
				if (!isValid) {
					this.store.dispatch(new CertificateFormAction.UpdateFormState());

					return of();
				}

				const consumer = new HttpConsumer<ResumeResponse, ResumeRequest>({
					endpoint: UserEndpoints.UPDATE,
				});

				this.store.dispatch(
					new CertificateFormAction.SubmitAsync({
						consumer: consumer,
					})
				);

				return consumer;
			})
		) as HttpConsumer<ResumeResponse, ResumeRequest>;
	}

	public updateCertificate(index: number): HttpConsumer<ResumeResponse, ResumeRequest> {
		return this.formIsValid$.pipe(
			take(1),
			switchMap((isValid: boolean) => {
				if (!isValid) {
					this.store.dispatch(new CertificateFormAction.UpdateFormState());

					return of();
				}

				const consumer = new HttpConsumer<ResumeResponse, ResumeRequest>({
					endpoint: UserEndpoints.UPDATE,
				});

				this.store.dispatch(
					new CertificateFormAction.UpdateCertificate({
						consumer: consumer,
						body: index,
					})
				);

				return consumer;
			})
		) as HttpConsumer<ResumeResponse, ResumeRequest>;
	}

	public deleteCertificate(index: number): HttpConsumer<ResumeResponse, ResumeRequest> {
		const consumer = new HttpConsumer<ResumeResponse, ResumeRequest>({
			endpoint: UserEndpoints.UPDATE,
		});

		this.store.dispatch(
			new CertificateFormAction.DeleteCertificate({
				consumer: consumer,
				body: index,
			})
		);

		return consumer;
	}
}
