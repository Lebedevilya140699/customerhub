import { Component, OnDestroy } from '@angular/core';
import { CurtainRef } from '@core/curtain';
import { filterNil, FormComponent, FormValidator, Map } from '@core/common';
import { CertificateForm, ContactsForm } from '@core/platform';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { CertificateFormAction } from './+state/certificates-form.actions';
import { CertificateFormFacade } from './+state/certificates-form.facade';
import { CertificateFormReducer } from './+state/certificates-form.reducer';
import { NgrxValueConverters } from 'ngrx-forms';
import { Observable, Subscription } from 'rxjs';
import { Resume, ResumeCertificate } from '@core/domain';
import { SessionFacade } from '@core/session';
import { ResumeCollectionService } from '@core/user';

@Component({
	selector: 'hh-certificates-edit',
	templateUrl: './certificates-edit.component.html',
})
export class CertificatesEditComponent
	extends FormComponent<
		CertificateFormReducer.CertificateFormPartialState,
		CertificateForm,
		CertificateFormAction.CertificateFormActions,
		CertificateFormAction,
		CertificateFormFacade
	>
	implements OnDestroy {
	public readonly dateValueConverter = NgrxValueConverters.dateToISOString;
	public resume$: Observable<Resume>;
	private sub: Subscription = Subscription.EMPTY;
	public isLoading = false;

	constructor(
		formFacade: CertificateFormFacade,
		validator: FormValidator,
		private readonly sessionFacade: SessionFacade,
		private readonly resumeCollectionService: ResumeCollectionService,
		public readonly curtain: CurtainRef
	) {
		super(formFacade, validator);

		this.resume$ = this.sessionFacade.userId$.pipe(
			filterNil,
			mergeMap((userId: number | null) => this.resumeCollectionService.resume(userId!)),
			filterNil
		);

		this.sub = this.resume$
			.pipe(
				map((resume: Resume) =>
					resume.certificates?.find((_x, i) => i === this.curtain.data)
				),
				filterNil,
				Map(CertificateForm, ResumeCertificate)
			)
			.subscribe((certificate: CertificateForm) => {
				this.formFacade.updateFormControl({
					value: certificate.name,
					name: 'name',
				});
				this.formFacade.updateFormControl({
					value: certificate.expirationAt,
					name: 'expirationAt',
				});
			});
	}

	public save() {
		this.isLoading = true;
		this.formIsInvalidAsync$.pipe(take(1)).subscribe((x) => {
			if (x) {
				this.isLoading = false;
				return;
			}

			this.formFacade.updateCertificate(this.curtain.data).subscribe(() => {
				this.curtain.close();
				this.isLoading = false;
			});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
