import { BaseError } from '../error';
import { BaseAction } from './base-action';

/**
 * Error action to be fired when error occurs
 * @typeparam TError - Interface that extends IBaseError
 * @typeperam TActionType - Type of action from enum
 */
export class ErrorAction<
	TError extends BaseError,
	TActionType extends string = string
> extends BaseAction<TActionType> {
	/**
	 * Create action instance
	 * @param error - Error that was thrown
	 * @param type - Type of action from enum
	 */
	constructor(public readonly error: TError, type: TActionType) {
		super(type);
	}
}
