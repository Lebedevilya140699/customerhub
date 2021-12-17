import { Component, Inject } from '@angular/core';
import {
	FormControlState,
	FormGroupControls,
	FormGroupState,
	FormState,
	KeyValue,
} from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FormActionPayload } from '../../interfaces/action';
import { IHttpOptions } from '../../interfaces/http';
import { FormAction, HttpConsumer } from '../../models';
import { FormValidator } from '../../services/form-validator';
import { FormFacade } from '../facade';

@Component({
	template: '',
})
export class FormComponent<
	TPartialState,
	TFormValue extends KeyValue,
	TActionType extends string,
	TAction extends FormAction<TFormValue, TActionType>,
	TFormFacade extends FormFacade<TPartialState, TFormValue, TActionType, TAction>
> {
	public get $formIsValid$(): Observable<boolean> {
		return this.formIsInvalid$.pipe(map((isInvalid: boolean) => !isInvalid));
	}

	public get $formValue$(): Observable<TFormValue> {
		return this.formValue$;
	}

	public get $formState$(): Observable<FormGroupState<TFormValue>> {
		return this.formState$;
	}

	public get $formControls$(): Observable<FormGroupControls<TFormValue>> {
		return this.formControls$;
	}

	public get $formControlsKeys$(): Observable<(keyof TFormValue)[]> {
		return this.formControlsKeys$;
	}

	public readonly formState$: Observable<FormGroupState<TFormValue>>;
	public readonly formControls$: Observable<FormGroupControls<TFormValue>>;
	public readonly formControlsKeys$: Observable<(keyof TFormValue)[]>;
	public readonly formIsInvalid$: Observable<boolean>;
	public readonly formIsInvalidAsync$: Observable<boolean>;
	public readonly formValue$: Observable<TFormValue>;
	public readonly disableButton$: Observable<boolean>;
	public readonly disableButtonAsync$: Observable<boolean>;

	public constructor(
		@Inject(FormFacade) protected readonly formFacade: TFormFacade,
		public readonly validator: FormValidator
	) {
		this.formState$ = formFacade.state$;
		this.formControls$ = formFacade.formControls$;
		this.formControlsKeys$ = formFacade.formControlsKeys$;
		this.formValue$ = formFacade.formValue$;
		this.formIsInvalid$ = this.formState$.pipe(
			map((state: FormGroupState<TFormValue>) => {
				return this.validator.isInvalid(state);
			})
		);
		this.formIsInvalidAsync$ = this.formState$.pipe(
			switchMap((state: FormGroupState<TFormValue>) => {
				return this.validator.isInvalidAsync(state);
			})
		);
		this.disableButton$ = this.formState$.pipe(
			map((state: FormGroupState<TFormValue>) => {
				return this.validator.disableButton(state);
			})
		);
		this.disableButtonAsync$ = this.formState$.pipe(
			switchMap((state: FormGroupState<TFormValue>) => {
				return this.validator.disableButtonAsync(state);
			})
		);
	}

	public trackByFn(_index: number, value: keyof TFormValue): keyof TFormValue {
		return value;
	}

	public hasError(formControl: FormControlState<any>, error?: string): boolean {
		if (error !== undefined) {
			return this.validator.controlHasError(formControl, error);
		}
		return this.validator.controlIsInvalid(formControl);
	}

	public addControl<TControlKey extends keyof TFormValue = keyof TFormValue>(
		name: TControlKey,
		value: TFormValue[TControlKey]
	): void {
		this.formFacade.addFormControl({
			name,
			value,
		});
	}

	public addArrayControl<TControlKey extends keyof TFormValue = keyof TFormValue>(
		name: TControlKey,
		value: TFormValue[TControlKey]
	): void {
		this.formFacade.addFormControl({
			name,
			value,
		});
	}

	public removeControl<TControlKey extends keyof TFormValue = keyof TFormValue>(
		key: TControlKey
	): void {
		this.formFacade.removeFormControl({
			key,
		});
	}

	public controlHasError(controlKey: keyof TFormValue): Observable<boolean> {
		return this.formFacade.hasError(controlKey);
	}

	public hasControl(controlKey: keyof TFormValue): Observable<boolean> {
		return this.formFacade.hasControl(controlKey);
	}

	public controlValue(
		controlKey: keyof TFormValue
	): Observable<TFormValue[keyof TFormValue] | null> {
		return this.formFacade.controlValue(controlKey);
	}

	public controlState(
		controlKey: keyof TFormValue
	): Observable<FormState<TFormValue[keyof TFormValue]> | null> {
		return this.formFacade.controlState(controlKey);
	}

	public submitForm<TPayload extends FormActionPayload.ISubmit<TFormValue>>(
		payload?: TPayload
	): void {
		this.formFacade.submitForm(payload);
	}

	public submitFormAsync<TResponse>(
		payload: IHttpOptions<TFormValue>
	): HttpConsumer<TResponse, TFormValue> {
		return this.formFacade.submitFormAsync(payload);
	}
}
