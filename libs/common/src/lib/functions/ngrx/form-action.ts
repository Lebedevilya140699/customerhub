import { KeyValue } from 'ngrx-forms';
import { HttpConsumer } from '../../models/http/http-consumer';
import { createPayloadAction, PayloadActionCreator } from './payload-action-creator';

export type SubmitAsyncCreator<
	T extends string,
	F extends KeyValue | undefined,
	R extends any = any,
	L extends any = any
> = PayloadActionCreator<T, { consumer: HttpConsumer<R, F> } & L>;

export function createSubmitAsync<
	T extends string,
	F extends KeyValue | undefined,
	R extends any = any,
	L extends any = any
>(type: T): SubmitAsyncCreator<T, F, R, L> {
	return createPayloadAction(type);
}

export type UpdateFormCreator<T extends string, F extends KeyValue> = PayloadActionCreator<
	T,
	{ value: Partial<F> }
>;

export function createUpdateForm<T extends string, F extends KeyValue>(
	type: T
): UpdateFormCreator<T, Partial<F>> {
	return createPayloadAction(type);
}
