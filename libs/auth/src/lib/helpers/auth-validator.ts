import { Injectable } from '@angular/core';
import { FormValidator } from '@core/common';
import { FormControlState, FormControlValueTypes } from 'ngrx-forms';

@Injectable()
export class AuthValidator extends FormValidator {
	public controlIsInvalid<T extends FormControlValueTypes>(
		control: FormControlState<T>
	): boolean {
		return (
			!!control &&
			Object.keys(control.errors).length > 0 &&
			((control.isSubmitted && control.isInvalid) ||
				(control.isTouched && control.isUnsubmitted && control.isInvalid))
		);
	}

	public controlHasError<T extends FormControlValueTypes>(
		control: FormControlState<T>,
		error: string
	): boolean {
		return (
			!!control &&
			Object.keys(control.errors).length > 0 &&
			error in control.errors &&
			((control.isSubmitted && control.isInvalid) ||
				(control.isTouched && control.isUnsubmitted && control.isInvalid))
		);
	}
}
