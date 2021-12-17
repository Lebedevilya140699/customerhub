import { Action, TypedAction } from '@ngrx/store/src/models';

/**
 * Abstract class for actions
 * @typeparam TActionType - Action type from enum
 */
export abstract class BaseAction<TActionType extends string>
	implements TypedAction<TActionType>, Action {
	/**
	 * Create action instance
	 * @param type - Action type
	 */
	protected constructor(public readonly type: TActionType) {}
}
