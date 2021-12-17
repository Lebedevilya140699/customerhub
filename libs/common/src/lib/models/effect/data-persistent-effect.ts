import { Injector } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { ErrorCode } from '../../enums/error';
import { ErrorAction } from '../../models/action';
import { BaseError } from '../error';
import { BaseEffect } from './base-effect';

/**
 * Abstract class for effects that use NX [DataPersistence]{@link DataPersistence}
 * @typeparam TPartialState - Store Partial State
 */
export abstract class DataPersistentEffect<
	TPartialState,
	TAction extends Action
> extends BaseEffect<TPartialState, TAction> {
	protected constructor(
		protected readonly dataPersistence: DataPersistence<TPartialState>,
		store$: Store<TPartialState>,
		actions$: Actions<TAction>,
		injector?: Injector
	) {
		super(store$, actions$, injector);
	}

	protected _handleError(error: BaseError, data?: any): Action {
		if (!this.isProduction) {
			// tslint:disable-next-line:no-console
			console.error(error);
		}
		if (error instanceof BaseError) {
			return new ErrorAction<BaseError>(error, error.name);
		} else {
			const newError = Object.assign<BaseError, Error>(
				new BaseError(),
				JSON.parse(JSON.stringify(error, replaceErrors))
			);
			newError.name = ErrorCode.CriticalError;
			newError.data = data;
			return new ErrorAction<BaseError>(newError, newError.name);
		}
	}
}

export function replaceErrors<T>(_: string, value: T extends Error ? Error : unknown) {
	if (value instanceof Error) {
		const newError: any = {};

		Object.getOwnPropertyNames(value).forEach(function (key: string) {
			newError[key] = ((value as unknown) as any)[key];
		});

		return newError;
	}

	return value;
}
