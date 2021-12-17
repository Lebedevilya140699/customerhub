import { FormAction, FormActionPayload } from '@core/common';
import { ContactsForm, ResumeRequest, ResumeResponse } from '@core/platform';

export module ContactsFormAction {
	export enum ContactsFormActions {
		UPDATE = '[ContactsForm] Update Form',
		RESET_FORM = '[ContactsForm] Reset Form',
		SUBMIT = '[ContactsForm] Submit Form',
		SUBMITTED = '[ContactsForm] Submitted Form',
		SUBMIT_ASYNC = '[ContactsForm] Submit Async',
		ADD_CONTROL = '[ContactsForm] Add Control',
		UPDATE_CONTROL = '[ContactsForm] Update Control',
		REMOVE_CONTROL = '[ContactsForm] Remove Control',
	}

	export class Submit extends FormAction.SubmitForm<
		ContactsForm,
		ContactsFormActions.SUBMIT,
		{ userId: number } & FormActionPayload.ISubmit<ContactsForm>
	> {
		constructor(payload: { userId: number } & FormActionPayload.ISubmit<ContactsForm>) {
			super(payload, ContactsFormActions.SUBMIT);
		}
	}

	export class SubmitAsync extends FormAction.SubmitFormAsync<
		ResumeRequest,
		ContactsFormActions.SUBMIT_ASYNC,
		ResumeResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<ResumeRequest, ResumeResponse>) {
			super(payload, ContactsFormActions.SUBMIT_ASYNC);
		}
	}

	export class AddControl extends FormAction.AddGroupElementAction<
		ContactsForm,
		ContactsFormActions.ADD_CONTROL
	> {
		constructor(payload: FormActionPayload.IAddGroupElement<ContactsForm>) {
			super(payload, ContactsFormActions.ADD_CONTROL);
		}
	}

	export class UpdateControl extends FormAction.UpdateGroupElementAction<
		ContactsForm,
		ContactsFormActions.UPDATE_CONTROL
	> {
		constructor(payload: FormActionPayload.IUpdateGroupElement<ContactsForm>) {
			super(payload, ContactsFormActions.UPDATE_CONTROL);
		}
	}

	export class RemoveControl extends FormAction.RemoveGroupElementAction<
		ContactsForm,
		ContactsFormActions.REMOVE_CONTROL
	> {
		constructor(payload: FormActionPayload.IRemoveGroupElement<ContactsForm>) {
			super(payload, ContactsFormActions.REMOVE_CONTROL);
		}
	}

	export class Update extends FormAction.UpdateForm<ContactsForm, ContactsFormActions.UPDATE> {
		constructor(payload: FormActionPayload.IUpdateValue<ContactsForm>) {
			super(payload, ContactsFormActions.UPDATE);
		}
	}

	export class Submitted extends FormAction.SubmittedForm<
		ContactsForm,
		ContactsFormActions.SUBMITTED
	> {
		constructor(payload: FormActionPayload.ISubmitted<ContactsForm>) {
			super(payload, ContactsFormActions.SUBMITTED);
		}
	}

	export class ResetForm extends FormAction.ResetForm<ContactsFormActions.RESET_FORM> {
		constructor() {
			super(ContactsFormActions.RESET_FORM);
		}
	}
}

export type ContactsFormAction =
	| ContactsFormAction.Submit
	| ContactsFormAction.SubmitAsync
	| ContactsFormAction.AddControl
	| ContactsFormAction.UpdateControl
	| ContactsFormAction.RemoveControl
	| ContactsFormAction.Update
	| ContactsFormAction.Submitted
	| ContactsFormAction.ResetForm;
