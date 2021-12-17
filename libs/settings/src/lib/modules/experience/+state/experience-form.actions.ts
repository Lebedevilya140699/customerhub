import { FormAction, FormActionPayload } from '@core/common';
import { ExperienceForm, ResumeRequest, ResumeResponse } from '@core/platform';

export module ExperienceFormAction {
	export enum ExperienceFormActions {
		UPDATE = '[ExperienceForm] Update Form',
		RESET_FORM = '[ExperienceForm] Reset Form',
		SUBMIT = '[ExperienceForm] Submit Form',
		SUBMITTED = '[ExperienceForm] Submitted Form',
		SUBMIT_ASYNC = '[ExperienceForm] Submit Async',
		ADD_CONTROL = '[ExperienceForm] Add Control',
		UPDATE_CONTROL = '[ExperienceForm] Update Control',
		REMOVE_CONTROL = '[ExperienceForm] Remove Control',
		DELETE_EXPERIENCE = '[ExperienceForm] Delete experience',
		UPDATE_EXPERIENCE = '[ExperienceForm] Update experience',
		UPDATE_FORM_STATE = '[ExperienceForm] Update form state',
	}

	export class Submit extends FormAction.SubmitForm<
		ExperienceForm,
		ExperienceFormActions.SUBMIT,
		{ userId: number } & FormActionPayload.ISubmit<ExperienceForm>
	> {
		constructor(payload: { userId: number } & FormActionPayload.ISubmit<ExperienceForm>) {
			super(payload, ExperienceFormActions.SUBMIT);
		}
	}

	export class SubmitAsync extends FormAction.SubmitFormAsync<
		ResumeRequest,
		ExperienceFormActions.SUBMIT_ASYNC,
		ResumeResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<ResumeRequest, ResumeResponse>) {
			super(payload, ExperienceFormActions.SUBMIT_ASYNC);
		}
	}

	export class AddControl extends FormAction.AddGroupElementAction<
		ExperienceForm,
		ExperienceFormActions.ADD_CONTROL
	> {
		constructor(payload: FormActionPayload.IAddGroupElement<ExperienceForm>) {
			super(payload, ExperienceFormActions.ADD_CONTROL);
		}
	}

	export class UpdateControl extends FormAction.UpdateGroupElementAction<
		ExperienceForm,
		ExperienceFormActions.UPDATE_CONTROL
	> {
		constructor(payload: FormActionPayload.IUpdateGroupElement<ExperienceForm>) {
			super(payload, ExperienceFormActions.UPDATE_CONTROL);
		}
	}

	export class RemoveControl extends FormAction.RemoveGroupElementAction<
		ExperienceForm,
		ExperienceFormActions.REMOVE_CONTROL
	> {
		constructor(payload: FormActionPayload.IRemoveGroupElement<ExperienceForm>) {
			super(payload, ExperienceFormActions.REMOVE_CONTROL);
		}
	}

	export class Update extends FormAction.UpdateForm<
		ExperienceForm,
		ExperienceFormActions.UPDATE
	> {
		constructor(payload: FormActionPayload.IUpdateValue<ExperienceForm>) {
			super(payload, ExperienceFormActions.UPDATE);
		}
	}

	export class Submitted extends FormAction.SubmittedForm<
		ExperienceForm,
		ExperienceFormActions.SUBMITTED
	> {
		constructor(payload: FormActionPayload.ISubmitted<ExperienceForm>) {
			super(payload, ExperienceFormActions.SUBMITTED);
		}
	}

	export class ResetForm extends FormAction.ResetForm<ExperienceFormActions.RESET_FORM> {
		constructor() {
			super(ExperienceFormActions.RESET_FORM);
		}
	}

	export class DeleteExperience extends FormAction.SubmitFormAsync<
		ResumeRequest,
		ExperienceFormActions.DELETE_EXPERIENCE,
		ResumeResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<ResumeRequest, ResumeResponse>) {
			super(payload, ExperienceFormActions.DELETE_EXPERIENCE);
		}
	}

	export class UpdateExperience extends FormAction.SubmitFormAsync<
		ResumeRequest,
		ExperienceFormActions.UPDATE_EXPERIENCE,
		ResumeResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<ResumeRequest, ResumeResponse>) {
			super(payload, ExperienceFormActions.UPDATE_EXPERIENCE);
		}
	}

	export class UpdateFormState extends FormAction.UpdateFormState<ExperienceFormActions.UPDATE_FORM_STATE> {
		constructor() {
			super(ExperienceFormActions.UPDATE_FORM_STATE);
		}
	}
}

export type ExperienceFormAction =
	| ExperienceFormAction.Submit
	| ExperienceFormAction.SubmitAsync
	| ExperienceFormAction.AddControl
	| ExperienceFormAction.UpdateControl
	| ExperienceFormAction.RemoveControl
	| ExperienceFormAction.Update
	| ExperienceFormAction.Submitted
	| ExperienceFormAction.DeleteExperience
	| ExperienceFormAction.UpdateExperience
	| ExperienceFormAction.UpdateFormState
	| ExperienceFormAction.ResetForm;
