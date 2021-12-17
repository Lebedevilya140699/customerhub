import { createAction, props } from '@ngrx/store';
import { ActionCreator, TypedAction } from '@ngrx/store/src/models';

export type PayloadActionCreator<T extends string, P> = ActionCreator<
	T,
	(props: { payload: P }) => { payload: P } & TypedAction<T>
>;
export type InferAction<AC extends ActionCreator> = AC extends PayloadActionCreator<
	infer T,
	infer P
>
	? { payload: P } & TypedAction<T>
	: AC extends ActionCreator<infer TA, infer C>
	? ReturnType<C> & TypedAction<TA>
	: never;
export type InferPayload<AC extends ActionCreator> = AC extends PayloadActionCreator<any, infer P>
	? { payload: P }
	: never;

export function createPayloadAction<T extends string, P>(type: T): PayloadActionCreator<T, P> {
	return createAction(type, props<{ payload: P }>());
}
