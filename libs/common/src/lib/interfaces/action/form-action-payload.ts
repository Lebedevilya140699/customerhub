import { KeyValue } from 'ngrx-forms';
import { HttpConsumer } from '../../models/http';

export module FormActionPayload {
	export interface IUpdateValue<TFormValue extends KeyValue> {
		readonly value: TFormValue;
	}

	export interface ISubmit<TFormValue extends KeyValue> {
		readonly keys?: keyof TFormValue[];
	}

	export interface ISubmitAsync<TFormValue extends KeyValue, TResponse = any>
		extends ISubmit<TFormValue> {
		readonly consumer: HttpConsumer<TResponse, TFormValue>;
		readonly body?: any;
	}

	export interface ISubmitted<TFormValue extends KeyValue> {
		readonly value: TFormValue;
	}

	export interface IRemoveGroupElement<
		TFormValue extends KeyValue,
		TControlKey extends keyof TFormValue = keyof TFormValue
	> {
		readonly key: TControlKey;
	}

	export interface IRemoveGroupElements<
		TFormValue extends KeyValue,
		TControlKey extends keyof TFormValue = keyof TFormValue
	> {
		readonly keys: TControlKey[];
	}

	export interface IAddGroupElement<
		TFormValue extends KeyValue,
		TControlKey extends keyof TFormValue = keyof TFormValue
	> {
		readonly name: TControlKey;
		readonly value: TFormValue[TControlKey];
	}

	export interface IUpdateGroupElement<
		TFormValue extends KeyValue,
		TControlKey extends keyof TFormValue = keyof TFormValue
	> {
		readonly name: TControlKey;
		readonly value: TFormValue[TControlKey];
	}

	export interface IAddGroupElements<TFormValue extends KeyValue> {
		readonly controls: Partial<TFormValue>;
	}
}

export type FormActionPayload<TFormValue extends KeyValue> =
	| FormActionPayload.IUpdateValue<TFormValue>
	| FormActionPayload.IAddGroupElement<TFormValue>
	| FormActionPayload.IAddGroupElements<TFormValue>
	| FormActionPayload.IRemoveGroupElement<TFormValue>
	| FormActionPayload.IRemoveGroupElements<TFormValue>
	| FormActionPayload.ISubmitted<TFormValue>
	| FormActionPayload.ISubmitAsync<TFormValue>
	| FormActionPayload.ISubmit<TFormValue>;
