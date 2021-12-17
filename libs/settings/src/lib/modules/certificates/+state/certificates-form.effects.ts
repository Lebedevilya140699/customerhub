import { Injectable, Injector } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { DataAccessEffect, Map, takeNotNil } from '@core/common';
import { HttpService } from '@core/http';
import { CertificateForm, ResumeResponse } from '@core/platform';
import { map, switchMap } from 'rxjs/operators';
import { ResumeCollectionService } from '@core/user';
import { SessionFacade } from '@core/session';
import { Resume, ResumeCertificate } from '@core/domain';
import { CertificateFormReducer } from './certificates-form.reducer';
import { CertificateFormAction } from './certificates-form.actions';
import { Mapper } from '@nartc/automapper';

@Injectable()
export class CertificateFormEffects extends DataAccessEffect<
	CertificateFormReducer.CertificateFormPartialState,
	CertificateFormAction,
	HttpService
> {
	public submitAsync$ = createEffect(() => {
		return this.dataPersistence.fetch(
			CertificateFormAction.CertificateFormActions.SUBMIT_ASYNC,
			{
				run: (
					action: CertificateFormAction.SubmitAsync,
					state: CertificateFormReducer.CertificateFormPartialState
				) => {
					const formValue: CertificateForm = Object.assign(
						new CertificateForm(),
						state[CertificateFormReducer.CERTIFICATE_FORM_FEATURE_KEY].value
					);

					return this.session.userId$.pipe(
						switchMap((x) => this.resumeCollectionService.resume(x!)),
						takeNotNil(1),
						switchMap((resume: Resume) => {
							if (Array.isArray(resume.certificates)) {
								resume.certificates.push(Mapper.map(formValue, ResumeCertificate));
							} else {
								resume.certificates = [Mapper.map(formValue, ResumeCertificate)];
							}

							action.payload.consumer.withBody(resume);

							return this.service.consume(action.payload.consumer).pipe(
								takeNotNil(1),
								Map(Resume, ResumeResponse),
								map((resume: Resume) => {
									this.resumeCollectionService.removeOneFromCache(resume);
									this.resumeCollectionService.upsertOneInCache(resume);

									return new CertificateFormAction.Submitted({
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

	public deleteCertificate$ = createEffect(() => {
		return this.dataPersistence.fetch(
			CertificateFormAction.CertificateFormActions.DELETE_CERTIFICATE,
			{
				id: () => null,
				run: (
					action: CertificateFormAction.DeleteCertificate,
					state: CertificateFormReducer.CertificateFormPartialState
				) => {
					let formValue: CertificateForm = Object.assign(
						new CertificateForm(),
						state[CertificateFormReducer.CERTIFICATE_FORM_FEATURE_KEY].value
					);

					return this.session.userId$.pipe(
						switchMap((x) => this.resumeCollectionService.resume(x!)),
						takeNotNil(1),
						switchMap((resume: Resume) => {
							if (Array.isArray(resume.certificates)) {
								resume.certificates = resume.certificates.filter(
									(_x, i) => i !== action.payload.body
								);
							} else {
								resume.certificates = null;
							}

							action.payload.consumer.withBody(resume);

							return this.service.consume(action.payload.consumer).pipe(
								takeNotNil(1),
								Map(Resume, ResumeResponse),
								map((resume: Resume) => {
									this.resumeCollectionService.removeOneFromCache(resume);
									this.resumeCollectionService.upsertOneInCache(resume);

									return new CertificateFormAction.Submitted({
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

	public updateCertificate$ = createEffect(() => {
		return this.dataPersistence.fetch(
			CertificateFormAction.CertificateFormActions.UPDATE_CERTIFICATE,
			{
				id: () => null,
				run: (
					action: CertificateFormAction.DeleteCertificate,
					state: CertificateFormReducer.CertificateFormPartialState
				) => {
					let formValue: CertificateForm = Object.assign(
						new CertificateForm(),
						state[CertificateFormReducer.CERTIFICATE_FORM_FEATURE_KEY].value
					);

					return this.session.userId$.pipe(
						switchMap((x) => this.resumeCollectionService.resume(x!)),
						takeNotNil(1),
						switchMap((resume: Resume) => {
							if (Array.isArray(resume.certificates)) {
								resume.certificates = resume.certificates.map((x, i) => {
									if (i === action.payload.body) {
										return Mapper.map(formValue, ResumeCertificate);
									}

									return x;
								});
							} else {
								resume.certificates = null;
							}

							action.payload.consumer.withBody(resume);

							return this.service.consume(action.payload.consumer).pipe(
								takeNotNil(1),
								Map(Resume, ResumeResponse),
								map((resume: Resume) => {
									this.resumeCollectionService.removeOneFromCache(resume);
									this.resumeCollectionService.upsertOneInCache(resume);

									return new CertificateFormAction.Submitted({
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
		dataPersistence: DataPersistence<CertificateFormReducer.CertificateFormPartialState>,
		store$: Store<CertificateFormReducer.CertificateFormPartialState>,
		actions$: Actions<CertificateFormAction>,
		service: HttpService,
		injector: Injector,
		private readonly resumeCollectionService: ResumeCollectionService,
		private readonly session: SessionFacade
	) {
		super(dataPersistence, store$, actions$, service, injector);
	}
}
