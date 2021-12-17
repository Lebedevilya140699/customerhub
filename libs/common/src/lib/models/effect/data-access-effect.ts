import { Injector } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { DataPersistentEffect } from './data-persistent-effect';

/**
 * Abstract class for effects that use NX [DataPersistence]{@link DataPersistence} and has access to the api with a service.
 * @typeparam TPartialState - Store Partial State
 * @typeparam TExceptionHandler - Error handler injectable
 * @typeperam TService - Service injectable than handles api requests
 */
export abstract class DataAccessEffect<
	TPartialState,
	TAction extends Action,
	TService
> extends DataPersistentEffect<TPartialState, TAction> {
	/**
	 * Dependency injection
	 * @param dataPersistence
	 * @param store$
	 * @param actions$
	 * @param service - Auth Service that makes api calls
	 * @param injector
	 */
	protected constructor(
		dataPersistence: DataPersistence<TPartialState>,
		store$: Store<TPartialState>,
		actions$: Actions<TAction>,
		protected readonly service: TService,
		injector?: Injector
	) {
		super(dataPersistence, store$, actions$, injector);
	}
}
