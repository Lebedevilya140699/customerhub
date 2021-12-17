import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormFacade, HttpConsumer } from '@core/common';
import { ExperienceForm, ResumeRequest, ResumeResponse } from '@core/platform';
import { switchMap, take } from 'rxjs/operators';
import { UserEndpoints } from '@core/user';
import { ExperienceFormReducer } from './experience-form.reducer';
import { ExperienceFormAction } from './experience-form.actions';
import { of } from 'rxjs';

@Injectable()
export class ExperienceFormFacade extends FormFacade<
	ExperienceFormReducer.ExperienceFormPartialState,
	ExperienceForm,
	ExperienceFormAction.ExperienceFormActions,
	ExperienceFormAction
> {
	constructor(store: Store<ExperienceFormReducer.ExperienceFormPartialState>) {
		super(store, ExperienceFormReducer.EXPERIENCE_FORM_FEATURE_KEY, {
			submitFormAction: ExperienceFormAction.Submit,
			submittedFormAction: ExperienceFormAction.Submitted,
			updateFormAction: ExperienceFormAction.Update,
			submitFormAsyncAction: ExperienceFormAction.SubmitAsync,
			addFormControlAction: ExperienceFormAction.AddControl,
			removeFormControlAction: ExperienceFormAction.RemoveControl,
			updateFormControlAction: ExperienceFormAction.UpdateControl,
			reset: ExperienceFormAction.ResetForm,
		});
	}

	public submitExperience(): HttpConsumer<ResumeResponse, ResumeRequest> {
		return this.formIsValid$.pipe(
			take(1),
			switchMap((isValid: boolean) => {
				if (!isValid) {
					this.store.dispatch(new ExperienceFormAction.UpdateFormState());

					return of();
				}

				const consumer = new HttpConsumer<ResumeResponse, ResumeRequest>({
					endpoint: UserEndpoints.UPDATE,
				});

				this.store.dispatch(
					new ExperienceFormAction.SubmitAsync({
						consumer: consumer,
					})
				);

				return consumer;
			})
		) as HttpConsumer<ResumeResponse, ResumeRequest>;
	}

	public updateExperience(index: number): HttpConsumer<ResumeResponse, ResumeRequest> {
		return this.formIsValid$.pipe(
			take(1),
			switchMap((isValid: boolean) => {
				if (!isValid) {
					this.store.dispatch(new ExperienceFormAction.UpdateFormState());

					return of();
				}

				const consumer = new HttpConsumer<ResumeResponse, ResumeRequest>({
					endpoint: UserEndpoints.UPDATE,
				});

				this.store.dispatch(
					new ExperienceFormAction.UpdateExperience({
						consumer: consumer,
						body: index,
					})
				);

				return consumer;
			})
		) as HttpConsumer<ResumeResponse, ResumeRequest>;
	}

	public deleteExperience(index: number): HttpConsumer<ResumeResponse, ResumeRequest> {
		const consumer = new HttpConsumer<ResumeResponse, ResumeRequest>({
			endpoint: UserEndpoints.UPDATE,
		});

		this.store.dispatch(
			new ExperienceFormAction.DeleteExperience({
				consumer: consumer,
				body: index,
			})
		);

		return consumer;
	}
}
