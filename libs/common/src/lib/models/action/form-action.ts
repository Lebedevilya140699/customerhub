import { KeyValue } from 'ngrx-forms';
import { FormActionPayload } from '../../interfaces/action/form-action-payload';
import { BaseAction } from './base-action';
import { PayloadAction } from './payload-action';

export module FormAction {
	/**
	 * Action fired to update form value
	 * @typeparam TActionType - Type of action from enum
	 * @typeparam TValue - Value of the form
	 */
	export abstract class UpdateForm<
		TValue extends KeyValue,
		TActionType extends string,
		TPayload extends FormActionPayload.IUpdateValue<TValue> = FormActionPayload.IUpdateValue<TValue>
	> extends PayloadAction<TPayload, TActionType> {
		/**
		 * Create action instance
		 * @param payload - Value of the form to be updated
		 * @param type - Type of action from enum
		 */
		protected constructor(payload: TPayload, type: TActionType) {
			super(payload, type);
		}
	}

	/**
	 * Action fired to remove group element
	 * @typeparam TActionType - Type of action from enum
	 * @typeparam TValue - Value of the form
	 * @typeparam TControlKey - The name of the control to add
	 */
	export abstract class RemoveGroupElementAction<
		TValue extends KeyValue,
		TActionType extends string,
		TPayload extends FormActionPayload.IRemoveGroupElement<TValue> = FormActionPayload.IRemoveGroupElement<TValue>
	> extends PayloadAction<TPayload, TActionType> {
		protected constructor(payload: TPayload, type: TActionType) {
			super(payload, type);
		}
	}

	export abstract class RemoveGroupElementsAction<
		TValue extends KeyValue,
		TActionType extends string,
		TPayload extends FormActionPayload.IRemoveGroupElements<TValue> = FormActionPayload.IRemoveGroupElements<TValue>
	> extends PayloadAction<TPayload, TActionType> {
		protected constructor(payload: TPayload, type: TActionType) {
			super(payload, type);
		}
	}

	/**
	 * Abstract class for actions fired to add an element to a form group
	 * @typeparam TActionType - Type of action from enum
	 * @typeparam TValue - Value of the form
	 * @typeparam TControlKey - The name of the control to add
	 */
	export abstract class AddGroupElementAction<
		TValue extends KeyValue,
		TActionType extends string,
		TPayload extends FormActionPayload.IAddGroupElement<TValue> = FormActionPayload.IAddGroupElement<TValue>
	> extends PayloadAction<TPayload, TActionType> {
		/**
		 * Create action instance
		 * @param payload
		 * @param type - Type of action from enum
		 */
		protected constructor(payload: TPayload, type: TActionType) {
			super(payload, type);
		}
	}

	export abstract class AddGroupElementsAction<
		TValue extends KeyValue,
		TActionType extends string,
		TPayload extends FormActionPayload.IAddGroupElements<TValue> = FormActionPayload.IAddGroupElements<TValue>
	> extends PayloadAction<TPayload, TActionType> {
		protected constructor(payload: TPayload, type: TActionType) {
			super(payload, type);
		}
	}

	export abstract class UpdateGroupElementAction<
		TValue extends KeyValue,
		TActionType extends string,
		TPayload extends FormActionPayload.IUpdateGroupElement<TValue> = FormActionPayload.IUpdateGroupElement<TValue>
	> extends PayloadAction<TPayload, TActionType> {
		protected constructor(payload: TPayload, type: TActionType) {
			super(payload, type);
		}
	}

	export abstract class SubmitForm<
		TValue extends KeyValue,
		TActionType extends string,
		TPayload extends FormActionPayload.ISubmit<TValue> = FormActionPayload.ISubmit<TValue>
	> extends PayloadAction<TPayload, TActionType> {
		protected constructor(payload: TPayload, type: TActionType) {
			super(payload, type);
		}
	}

	export abstract class SubmitFormAsync<
		TValue extends KeyValue,
		TActionType extends string,
		TResponse = any,
		TPayload extends FormActionPayload.ISubmitAsync<
			TValue,
			TResponse
		> = FormActionPayload.ISubmitAsync<TValue, TResponse>
	> extends PayloadAction<TPayload, TActionType> {
		protected constructor(payload: TPayload, type: TActionType) {
			super(payload, type);
		}
	}

	export abstract class SubmittedForm<
		TValue extends KeyValue,
		TActionType extends string,
		TPayload extends FormActionPayload.ISubmitted<TValue> = FormActionPayload.ISubmitted<TValue>
	> extends PayloadAction<TPayload, TActionType> {
		protected constructor(payload: TPayload, type: TActionType) {
			super(payload, type);
		}
	}

	export abstract class ResetForm<TActionType extends string> extends BaseAction<TActionType> {
		protected constructor(type: TActionType) {
			super(type);
		}
	}

	export abstract class UpdateFormState<
		TActionType extends string
	> extends BaseAction<TActionType> {
		protected constructor(type: TActionType) {
			super(type);
		}
	}
}

export type FormAction<TFormValue extends KeyValue, TActionType extends string> =
	| FormAction.SubmittedForm<TFormValue, TActionType>
	| FormAction.SubmitForm<TFormValue, TActionType>
	| FormAction.UpdateForm<TFormValue, TActionType>
	| FormAction.AddGroupElementAction<TFormValue, TActionType>
	| FormAction.AddGroupElementsAction<TFormValue, TActionType>
	| FormAction.RemoveGroupElementAction<TFormValue, TActionType>
	| FormAction.RemoveGroupElementsAction<TFormValue, TActionType>
	| FormAction.UpdateGroupElementAction<TFormValue, TActionType>
	| FormAction.SubmitFormAsync<TFormValue, TActionType>
	| FormAction.ResetForm<TActionType>
	| FormAction.UpdateFormState<TActionType>;
