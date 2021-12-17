import { BaseAction } from './base-action';

/**
 * Abstract class for actions that have payload
 * @extends BaseAction
 * @typeparam {TPayload} - Generic type of payload
 * @typeparam {TActionType} - Generic type of action
 */
export abstract class PayloadAction<
	TPayload,
	TActionType extends string
> extends BaseAction<TActionType> {
	protected constructor(public readonly payload: TPayload, type: TActionType) {
		super(type);
	}
}
