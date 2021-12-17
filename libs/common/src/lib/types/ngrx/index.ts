import { ActionCreator } from '@ngrx/store/src/models';
import { PayloadActionCreator } from '../../functions/ngrx/payload-action-creator';

export type Dispatcher<TActionMap> = {
	[A in keyof TActionMap]: TActionMap[A] extends PayloadActionCreator<any, infer TActionPayload>
		? (payload: { payload: TActionPayload }) => void
		: TActionMap[A] extends ActionCreator<any>
		? () => void
		: never;
};
