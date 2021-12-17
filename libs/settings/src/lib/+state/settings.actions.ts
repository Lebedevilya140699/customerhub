import { FormAction, FormActionPayload } from '@core/common';
import { ResumeForm, UserResponse } from '@core/platform';

export module SettingsAction {
	export enum SettingsActions {
		UPDATE = '[Settings] Update Form',
		RESET_FORM = '[Settings] Reset Form',
		SUBMIT = '[Settings] Submit Form',
		SUBMITTED = '[Settings] Submitted Form',
		SUBMIT_ASYNC = '[Settings] Submit Async',
		ADD_CONTROL = '[Settings] Add Control',
		UPDATE_CONTROL = '[Settings] Update Control',
		REMOVE_CONTROL = '[Settings] Remove Control',
	}

	export class Submit extends FormAction.SubmitForm<
		ResumeForm,
		SettingsActions.SUBMIT,
		{ userId: number } & FormActionPayload.ISubmit<ResumeForm>
	> {
		constructor(payload: { userId: number } & FormActionPayload.ISubmit<ResumeForm>) {
			super(payload, SettingsActions.SUBMIT);
		}
	}

	export class SubmitAsync extends FormAction.SubmitFormAsync<
		UserResponse,
		SettingsActions.SUBMIT_ASYNC,
		UserResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<UserResponse, UserResponse>) {
			super(payload, SettingsActions.SUBMIT_ASYNC);
		}
	}

	export class AddControl extends FormAction.AddGroupElementAction<
		ResumeForm,
		SettingsActions.ADD_CONTROL
	> {
		constructor(payload: FormActionPayload.IAddGroupElement<ResumeForm>) {
			super(payload, SettingsActions.ADD_CONTROL);
		}
	}

	export class UpdateControl extends FormAction.UpdateGroupElementAction<
		ResumeForm,
		SettingsActions.UPDATE_CONTROL
	> {
		constructor(payload: FormActionPayload.IUpdateGroupElement<ResumeForm>) {
			super(payload, SettingsActions.UPDATE_CONTROL);
		}
	}

	export class RemoveControl extends FormAction.RemoveGroupElementAction<
		ResumeForm,
		SettingsActions.REMOVE_CONTROL
	> {
		constructor(payload: FormActionPayload.IRemoveGroupElement<ResumeForm>) {
			super(payload, SettingsActions.REMOVE_CONTROL);
		}
	}

	export class Update extends FormAction.UpdateForm<ResumeForm, SettingsActions.UPDATE> {
		constructor(payload: FormActionPayload.IUpdateValue<ResumeForm>) {
			super(payload, SettingsActions.UPDATE);
		}
	}

	export class Submitted extends FormAction.SubmittedForm<ResumeForm, SettingsActions.SUBMITTED> {
		constructor(payload: FormActionPayload.ISubmitted<ResumeForm>) {
			super(payload, SettingsActions.SUBMITTED);
		}
	}

	export class ResetForm extends FormAction.ResetForm<SettingsActions.RESET_FORM> {
		constructor() {
			super(SettingsActions.RESET_FORM);
		}
	}
}

export type SettingsAction =
	| SettingsAction.Submit
	| SettingsAction.SubmitAsync
	| SettingsAction.AddControl
	| SettingsAction.UpdateControl
	| SettingsAction.RemoveControl
	| SettingsAction.Update
	| SettingsAction.Submitted
	| SettingsAction.ResetForm;
