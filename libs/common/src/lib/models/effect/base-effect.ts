import { Injector } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { IS_PRODUCTION } from '../../injection-tokens/environment/is-production';

/**
 * Abstract class for effects containing actions and store providers
 * @typeparam TPartialState - Partial state of store
 * @typeparam TAction - Actions that are used in effect
 */
export abstract class BaseEffect<TPartialState, TAction extends Action> {
	/**
	 * Store and actions injection
	 * @param store$ - Store provider
	 * @param actions$ - Actions provider
	 */
	protected readonly isProduction: boolean = false;

	protected constructor(
		protected readonly store$: Store<TPartialState>,
		protected readonly actions$: Actions<TAction>,
		protected readonly injector?: Injector
	) {
		if (!!injector) {
			this.isProduction = injector.get(IS_PRODUCTION);
		}
	}
}
