import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormFacade, HttpConsumer } from '@core/common';
import { LinksForm, ResumeRequest, ResumeResponse, UserResponse } from '@core/platform';
import { LinksFormAction } from './links-form.actions';
import { LinksFormReducer } from './links-form.reducer';
import { switchMap, take } from 'rxjs/operators';
import { UserEndpoints } from '@core/user';
import { SettingsAction } from '../../../+state/settings.actions';
import { of } from 'rxjs';

@Injectable()
export class LinksFormFacade extends FormFacade<
	LinksFormReducer.LinksFormPartialState,
	LinksForm,
	LinksFormAction.LinksFormActions,
	LinksFormAction
> {
	constructor(store: Store<LinksFormReducer.LinksFormPartialState>) {
		super(store, LinksFormReducer.LINKS_FORM_FEATURE_KEY, {
			submitFormAction: LinksFormAction.Submit,
			submittedFormAction: LinksFormAction.Submitted,
			updateFormAction: LinksFormAction.Update,
			submitFormAsyncAction: LinksFormAction.SubmitAsync,
			addFormControlAction: LinksFormAction.AddControl,
			removeFormControlAction: LinksFormAction.RemoveControl,
			updateFormControlAction: LinksFormAction.UpdateControl,
			reset: LinksFormAction.ResetForm,
			updateFormState: LinksFormAction.UpdateFormState,
		});
	}

	public submitLinks(): HttpConsumer<ResumeResponse, ResumeRequest> {
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
					new LinksFormAction.SubmitAsync({
						consumer: consumer,
					})
				);

				return consumer;
			})
		) as HttpConsumer<ResumeResponse, ResumeRequest>;
	}

	public deleteLink(index: number): HttpConsumer<ResumeResponse, ResumeRequest> {
		const consumer = new HttpConsumer<ResumeResponse, ResumeRequest>({
			endpoint: UserEndpoints.UPDATE,
		});

		this.store.dispatch(
			new LinksFormAction.DeleteLink({
				consumer: consumer,
				body: index,
			})
		);

		return consumer;
	}
}
