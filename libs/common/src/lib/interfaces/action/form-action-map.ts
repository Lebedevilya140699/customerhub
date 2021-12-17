import { Constructible } from '@nartc/automapper';
import { FormAction } from '../../models';
import { BaseActionMap } from './base-action-map';
import { ActionCreator, FunctionWithParametersType } from '@ngrx/store/src/models';

export interface FormActionMap<
	TFormValue,
	TActionType extends string,
	TFormAction extends FormAction<TFormValue, TActionType> = FormAction<TFormValue, TActionType>
> extends BaseActionMap<TActionType, TFormAction> {
	updateFormAction?: Constructible<TFormAction>;
	submitFormAction?: Constructible<TFormAction>;
	submitFormAsyncAction?: Constructible<TFormAction>;
	submittedFormAction?: Constructible<TFormAction>;
	addFormControlAction?: Constructible<TFormAction>;
	updateFormControlAction?: Constructible<TFormAction>;
	addFormControlsAction?: Constructible<TFormAction>;
	removeFormControlAction?: Constructible<TFormAction>;
	removeFormControlsAction?: Constructible<TFormAction>;
	updateFormState?: Constructible<TFormAction>;
}
