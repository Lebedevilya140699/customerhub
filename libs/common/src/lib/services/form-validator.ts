import { Injectable } from '@angular/core';
import { FormControlState, FormControlValueTypes, FormGroupState, KeyValue } from 'ngrx-forms';
import { Observable, of } from 'rxjs';

@Injectable()
export class FormValidator {
	public isInvalidAsync<T extends KeyValue>(form: FormGroupState<T>): Observable<boolean> {
		return of(form.isInvalid && form.isSubmitted);
	}

	public controlIsInvalid<T extends FormControlValueTypes>(
		control: FormControlState<T>
	): boolean {
		return (
			!!control &&
			Object.keys(control.errors).length > 0 &&
			control.isSubmitted &&
			control.isInvalid
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
			control.isInvalid
		);
	}

	public isInvalid<T extends KeyValue>(form: FormGroupState<T>): boolean {
		return form.isSubmitted;
	}

	public disableButton<T extends KeyValue>(form: FormGroupState<T>): boolean {
		return form.isInvalid && form.isSubmitted;
	}

	public disableButtonAsync<T extends KeyValue>(form: FormGroupState<T>): Observable<boolean> {
		return of(this.disableButton(form));
	}
}
