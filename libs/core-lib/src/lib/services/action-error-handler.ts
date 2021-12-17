import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	ApiErrorResponse,
	BaseError,
	ErrorAction,
	ErrorCode,
	SerializerService,
} from '@core/common';

@Injectable()
export class ActionErrorHandler extends ErrorHandler implements ErrorHandler {
	constructor(private readonly injector: Injector) {
		super();
	}

	public handleError(error: any): void {
		super.handleError(error);
		if ('error' in error) {
			error = error.error;
		}
		if (error.hasOwnProperty('error')) {
			error = this.injector.get(SerializerService).deserialize(ApiErrorResponse, error);
		} else {
			const newError = new BaseError();
			newError.name = ErrorCode.CriticalError;
			newError.message = error.message;
			error = newError;
		}
		const store = this.injector.get(Store);
		store.dispatch(new ErrorAction(error, error.name));
	}
}
