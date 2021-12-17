import { KeyValue } from 'ngrx-forms';

export interface IFormControlProp<
	TFormValue extends KeyValue,
	TControlKey extends keyof TFormValue = keyof TFormValue
> {
	readonly controlKey: TControlKey;
}
