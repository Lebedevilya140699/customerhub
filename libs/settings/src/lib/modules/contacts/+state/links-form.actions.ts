import { FormAction, FormActionPayload } from '@core/common';
import { LinksForm, ResumeRequest, ResumeResponse } from '@core/platform';

export module LinksFormAction {
	export enum LinksFormActions {
		UPDATE = '[LinksForm] Update Form',
		RESET_FORM = '[LinksForm] Reset Form',
		UPDATE_FORM_STATE = '[LinksForm] Update form state',
		SUBMIT = '[LinksForm] Submit Form',
		SUBMITTED = '[LinksForm] Submitted Form',
		SUBMIT_ASYNC = '[LinksForm] Submit Async',
		ADD_CONTROL = '[LinksForm] Add Control',
		UPDATE_CONTROL = '[LinksForm] Update Control',
		REMOVE_CONTROL = '[LinksForm] Remove Control',
		DELETE_LINK = '[LinksForm] Delete link',
	}

	export class Submit extends FormAction.SubmitForm<
		LinksForm,
		LinksFormActions.SUBMIT,
		{ userId: number } & FormActionPayload.ISubmit<LinksForm>
	> {
		constructor(payload: { userId: number } & FormActionPayload.ISubmit<LinksForm>) {
			super(payload, LinksFormActions.SUBMIT);
		}
	}

	export class SubmitAsync extends FormAction.SubmitFormAsync<
		ResumeRequest,
		LinksFormActions.SUBMIT_ASYNC,
		ResumeResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<ResumeRequest, ResumeResponse>) {
			super(payload, LinksFormActions.SUBMIT_ASYNC);
		}
	}

	export class DeleteLink extends FormAction.SubmitFormAsync<
		ResumeRequest,
		LinksFormActions.DELETE_LINK,
		ResumeResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<ResumeRequest, ResumeResponse>) {
			super(payload, LinksFormActions.DELETE_LINK);
		}
	}

	export class AddControl extends FormAction.AddGroupElementAction<
		LinksForm,
		LinksFormActions.ADD_CONTROL
	> {
		constructor(payload: FormActionPayload.IAddGroupElement<LinksForm>) {
			super(payload, LinksFormActions.ADD_CONTROL);
		}
	}

	export class UpdateControl extends FormAction.UpdateGroupElementAction<
		LinksForm,
		LinksFormActions.UPDATE_CONTROL
	> {
		constructor(payload: FormActionPayload.IUpdateGroupElement<LinksForm>) {
			super(payload, LinksFormActions.UPDATE_CONTROL);
		}
	}

	export class RemoveControl extends FormAction.RemoveGroupElementAction<
		LinksForm,
		LinksFormActions.REMOVE_CONTROL
	> {
		constructor(payload: FormActionPayload.IRemoveGroupElement<LinksForm>) {
			super(payload, LinksFormActions.REMOVE_CONTROL);
		}
	}

	export class Update extends FormAction.UpdateForm<LinksForm, LinksFormActions.UPDATE> {
		constructor(payload: FormActionPayload.IUpdateValue<LinksForm>) {
			super(payload, LinksFormActions.UPDATE);
		}
	}

	export class Submitted extends FormAction.SubmittedForm<LinksForm, LinksFormActions.SUBMITTED> {
		constructor(payload: FormActionPayload.ISubmitted<LinksForm>) {
			super(payload, LinksFormActions.SUBMITTED);
		}
	}

	export class ResetForm extends FormAction.ResetForm<LinksFormActions.RESET_FORM> {
		constructor() {
			super(LinksFormActions.RESET_FORM);
		}
	}

	export class UpdateFormState extends FormAction.UpdateFormState<LinksFormActions.UPDATE_FORM_STATE> {
		constructor() {
			super(LinksFormActions.UPDATE_FORM_STATE);
		}
	}
}

export type LinksFormAction =
	| LinksFormAction.Submit
	| LinksFormAction.SubmitAsync
	| LinksFormAction.AddControl
	| LinksFormAction.UpdateControl
	| LinksFormAction.RemoveControl
	| LinksFormAction.Update
	| LinksFormAction.Submitted
	| LinksFormAction.UpdateFormState
	| LinksFormAction.ResetForm;
