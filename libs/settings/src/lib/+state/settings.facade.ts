import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormFacade, HttpConsumer } from '@core/common';
import { ResumeForm, ResumeResponse, UserResponse } from '@core/platform';
import { SettingsReducer } from './settings.reducer';
import { SettingsAction } from './settings.actions';
import { switchMap, take } from 'rxjs/operators';
import { UserEndpoints } from '@core/user';
import { ResumeRequest } from '../../../../platform/src/lib/requests/resume';

@Injectable()
export class SettingsFacade extends FormFacade<
	SettingsReducer.SettingsPartialState,
	ResumeForm,
	SettingsAction.SettingsActions,
	SettingsAction
> {
	constructor(store: Store<SettingsReducer.SettingsPartialState>) {
		super(store, SettingsReducer.SETTINGS_FEATURE_KEY, {
			submitFormAction: SettingsAction.Submit,
			submittedFormAction: SettingsAction.Submitted,
			updateFormAction: SettingsAction.Update,
			submitFormAsyncAction: SettingsAction.SubmitAsync,
			addFormControlAction: SettingsAction.AddControl,
			removeFormControlAction: SettingsAction.RemoveControl,
			updateFormControlAction: SettingsAction.UpdateControl,
			reset: SettingsAction.ResetForm,
		});
	}

	public submitPart(): HttpConsumer<UserResponse, UserResponse> {
		return this.formControls$.pipe(
			take(1),
			switchMap(() => {
				const consumer = new HttpConsumer<ResumeResponse, ResumeRequest>({
					endpoint: UserEndpoints.UPDATE,
				});

				this.store.dispatch(
					new SettingsAction.SubmitAsync({
						consumer: consumer,
					})
				);

				return consumer;
			})
		) as HttpConsumer<UserResponse, UserResponse>;
	}
}
