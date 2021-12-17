import { FormAction, FormActionPayload } from '@core/common';
import { CertificateForm, ResumeRequest, ResumeResponse } from '@core/platform';

export module CertificateFormAction {
	export enum CertificateFormActions {
		UPDATE = '[CertificateForm] Update Form',
		RESET_FORM = '[CertificateForm] Reset Form',
		SUBMIT = '[CertificateForm] Submit Form',
		SUBMITTED = '[CertificateForm] Submitted Form',
		SUBMIT_ASYNC = '[CertificateForm] Submit Async',
		ADD_CONTROL = '[CertificateForm] Add Control',
		UPDATE_CONTROL = '[CertificateForm] Update Control',
		REMOVE_CONTROL = '[CertificateForm] Remove Control',
		DELETE_CERTIFICATE = '[CertificateForm] Delete certificate',
		UPDATE_CERTIFICATE = '[CertificateForm] Update certificate',
		UPDATE_FORM_STATE = '[CertificateForm] Update form state',
	}

	export class Submit extends FormAction.SubmitForm<
		CertificateForm,
		CertificateFormActions.SUBMIT,
		{ userId: number } & FormActionPayload.ISubmit<CertificateForm>
	> {
		constructor(payload: { userId: number } & FormActionPayload.ISubmit<CertificateForm>) {
			super(payload, CertificateFormActions.SUBMIT);
		}
	}

	export class SubmitAsync extends FormAction.SubmitFormAsync<
		ResumeRequest,
		CertificateFormActions.SUBMIT_ASYNC,
		ResumeResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<ResumeRequest, ResumeResponse>) {
			super(payload, CertificateFormActions.SUBMIT_ASYNC);
		}
	}

	export class AddControl extends FormAction.AddGroupElementAction<
		CertificateForm,
		CertificateFormActions.ADD_CONTROL
	> {
		constructor(payload: FormActionPayload.IAddGroupElement<CertificateForm>) {
			super(payload, CertificateFormActions.ADD_CONTROL);
		}
	}

	export class UpdateControl extends FormAction.UpdateGroupElementAction<
		CertificateForm,
		CertificateFormActions.UPDATE_CONTROL
	> {
		constructor(payload: FormActionPayload.IUpdateGroupElement<CertificateForm>) {
			super(payload, CertificateFormActions.UPDATE_CONTROL);
		}
	}

	export class RemoveControl extends FormAction.RemoveGroupElementAction<
		CertificateForm,
		CertificateFormActions.REMOVE_CONTROL
	> {
		constructor(payload: FormActionPayload.IRemoveGroupElement<CertificateForm>) {
			super(payload, CertificateFormActions.REMOVE_CONTROL);
		}
	}

	export class Update extends FormAction.UpdateForm<
		CertificateForm,
		CertificateFormActions.UPDATE
	> {
		constructor(payload: FormActionPayload.IUpdateValue<CertificateForm>) {
			super(payload, CertificateFormActions.UPDATE);
		}
	}

	export class Submitted extends FormAction.SubmittedForm<
		CertificateForm,
		CertificateFormActions.SUBMITTED
	> {
		constructor(payload: FormActionPayload.ISubmitted<CertificateForm>) {
			super(payload, CertificateFormActions.SUBMITTED);
		}
	}

	export class ResetForm extends FormAction.ResetForm<CertificateFormActions.RESET_FORM> {
		constructor() {
			super(CertificateFormActions.RESET_FORM);
		}
	}

	export class DeleteCertificate extends FormAction.SubmitFormAsync<
		ResumeRequest,
		CertificateFormActions.DELETE_CERTIFICATE,
		ResumeResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<ResumeRequest, ResumeResponse>) {
			super(payload, CertificateFormActions.DELETE_CERTIFICATE);
		}
	}

	export class UpdateCertificate extends FormAction.SubmitFormAsync<
		ResumeRequest,
		CertificateFormActions.UPDATE_CERTIFICATE,
		ResumeResponse
	> {
		constructor(payload: FormActionPayload.ISubmitAsync<ResumeRequest, ResumeResponse>) {
			super(payload, CertificateFormActions.UPDATE_CERTIFICATE);
		}
	}

	export class UpdateFormState extends FormAction.UpdateFormState<CertificateFormActions.UPDATE_FORM_STATE> {
		constructor() {
			super(CertificateFormActions.UPDATE_FORM_STATE);
		}
	}
}

export type CertificateFormAction =
	| CertificateFormAction.Submit
	| CertificateFormAction.SubmitAsync
	| CertificateFormAction.AddControl
	| CertificateFormAction.UpdateControl
	| CertificateFormAction.RemoveControl
	| CertificateFormAction.Update
	| CertificateFormAction.Submitted
	| CertificateFormAction.DeleteCertificate
	| CertificateFormAction.UpdateCertificate
	| CertificateFormAction.UpdateFormState
	| CertificateFormAction.ResetForm;
