import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { FormGroupControls, FormGroupState, FormState, KeyValue } from 'ngrx-forms';
import { BaseQueryMap } from './base-query-map';
import { IFormControlProp } from './form-control-prop';

export interface FormQueryMap<
	TFormValue extends KeyValue,
	TPartialState,
	TState extends FormGroupState<TFormValue> = FormGroupState<TFormValue>
> extends BaseQueryMap<TPartialState, TState> {
	formControlsQuery?: MemoizedSelector<TPartialState, FormGroupControls<TFormValue>>;
	formControlsKeysQuery?: MemoizedSelector<TPartialState, (keyof TFormValue)[]>;
	formIsValidQuery?: MemoizedSelector<TPartialState, boolean>;
	formValueQuery?: MemoizedSelector<TPartialState, TFormValue>;
	hasControlQuery?: MemoizedSelectorWithProps<
		TPartialState,
		IFormControlProp<TFormValue>,
		boolean
	>;
	hasErrorQuery?: MemoizedSelectorWithProps<TPartialState, IFormControlProp<TFormValue>, boolean>;
	formControlValueQuery?: MemoizedSelectorWithProps<
		TPartialState,
		IFormControlProp<TFormValue>,
		TFormValue[keyof TFormValue] | null
	>;
	formControlStateQuery?: MemoizedSelectorWithProps<
		TPartialState,
		IFormControlProp<TFormValue>,
		FormState<TFormValue[keyof TFormValue]> | null
	>;
}
