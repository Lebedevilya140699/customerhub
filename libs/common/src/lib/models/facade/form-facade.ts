import { createSelector, MemoizedSelectorWithProps, select, Store } from '@ngrx/store';
import { FormGroupControls, FormGroupState, FormState, KeyValue } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { FormActionMap } from '../../interfaces/action/form-action-map';
import { FormActionPayload } from '../../interfaces/action/form-action-payload';
import { IHttpOptions } from '../../interfaces/http';
import { IFormControlProp } from '../../interfaces/query';
import { FormQueryMap } from '../../interfaces/query/form-query-map';
import { FormAction } from '../action';
import { HttpConsumer } from '../http';
import { BaseFacade } from './base-facade';

/**
 * Abstract class for facades that access form state
 * @typeparam TPartialState - Store partial state
 * @typeparam TFormValue - Form value model
 */
export abstract class FormFacade<
	TPartialState = object,
	TFormValue extends KeyValue = KeyValue,
	TActionType extends string = string,
	TAction extends FormAction<TFormValue, TActionType> = FormAction<TFormValue, TActionType>,
	TState extends FormGroupState<TFormValue> = FormGroupState<TFormValue>,
	TQueryMap extends FormQueryMap<TFormValue, TPartialState, TState> = FormQueryMap<
		TFormValue,
		TPartialState,
		TState
	>,
	TActionMap extends FormActionMap<TFormValue, TActionType, TAction> = FormActionMap<
		TFormValue,
		TActionType,
		TAction
	>
> extends BaseFacade<TPartialState, TState, TActionType, TAction, TQueryMap, TActionMap> {
	protected constructor(
		store: Store<TPartialState>,
		featureKey?: keyof TPartialState,
		actionMap?: TActionMap,
		queryMap?: TQueryMap
	) {
		super(store, queryMap, actionMap, featureKey);
		const selectorMap: TQueryMap = queryMap ?? ({} as TQueryMap);

		if (this.queryMap.selectState === undefined) {
			throw new Error('State query must be defined');
		}

		if (!selectorMap.formControlsQuery) {
			selectorMap.formControlsQuery = createSelector(
				this.queryMap.selectState,
				(state: TState) => state.controls
			);
		}
		this.formControls$ = store.pipe(select(selectorMap.formControlsQuery));

		if (!selectorMap.formIsValidQuery) {
			selectorMap.formIsValidQuery = createSelector(
				this.queryMap.selectState,
				(state: TState) => state.isValid
			);
		}
		this.formIsValid$ = store.pipe(select(selectorMap.formIsValidQuery));

		if (!selectorMap.formControlsKeysQuery) {
			selectorMap.formControlsKeysQuery = createSelector(
				this.queryMap.selectState,
				(state: TState) => Object.keys(state.controls) as (keyof TFormValue)[]
			);
		}
		this.formControlsKeys$ = store.pipe(select(selectorMap.formControlsKeysQuery));

		if (!selectorMap.formValueQuery) {
			selectorMap.formValueQuery = createSelector(
				this.queryMap.selectState,
				(state: TState) => state.value
			);
		}
		this.formValue$ = store.pipe(select(selectorMap.formValueQuery));

		if (!selectorMap.hasControlQuery) {
			selectorMap.hasControlQuery = createSelector(
				this.queryMap.selectState,
				selectorMap.formControlsKeysQuery,
				(
					_state: TState,
					controls: (keyof TFormValue)[],
					props: IFormControlProp<TFormValue>
				) => {
					return controls.includes(props.controlKey);
				}
			);
		}
		this.hasControl = (controlKey: keyof TFormValue) => {
			return store.pipe(
				select(
					selectorMap.hasControlQuery as MemoizedSelectorWithProps<
						TPartialState,
						IFormControlProp<TFormValue>,
						boolean
					>,
					{ controlKey }
				)
			);
		};

		if (!selectorMap.formControlStateQuery) {
			//@ts-ignore
			selectorMap.formControlStateQuery = createSelector(
				this.queryMap.selectState,
				(state: TState, prop: IFormControlProp<TFormValue>) => {
					return state.controls?.[prop.controlKey] ?? null;
				}
			);
		}
		this.controlState = (controlKey: keyof TFormValue) => {
			return store.pipe(
				select(
					selectorMap.formControlStateQuery as MemoizedSelectorWithProps<
						TPartialState,
						IFormControlProp<TFormValue>,
						FormState<TFormValue[keyof TFormValue]> | null
					>,
					{ controlKey }
				)
			);
		};
		if (!selectorMap.formControlValueQuery) {
			selectorMap.formControlValueQuery = createSelector(
				this.queryMap.selectState,
				(state: TState, props: IFormControlProp<TFormValue>) => {
					return state?.controls[props.controlKey].value ?? null;
				}
			);
		}
		this.controlValue = (controlKey: keyof TFormValue) => {
			return store.pipe(
				select(
					selectorMap.formControlValueQuery as MemoizedSelectorWithProps<
						TPartialState,
						IFormControlProp<TFormValue>,
						TFormValue[keyof TFormValue] | null
					>,
					{ controlKey }
				)
			);
		};

		if (!selectorMap.hasErrorQuery) {
			selectorMap.hasErrorQuery = createSelector(
				this.queryMap.selectState,
				(state: TState, props: IFormControlProp<TFormValue>) => {
					// @ts-ignore
					return !!state?.controls?.[props.controlKey]?.errors;
				}
			);
		}
		this.hasError = (controlKey: keyof TFormValue) => {
			return store.pipe(
				select(
					selectorMap.hasErrorQuery as MemoizedSelectorWithProps<
						TPartialState,
						IFormControlProp<TFormValue>,
						boolean
					>,
					{ controlKey }
				)
			);
		};

		this.queryMap = {
			...this.queryMap,
			...selectorMap,
		};

		if (!!actionMap) {
			const {
				submitFormAction,
				addFormControlAction,
				updateFormAction,
				addFormControlsAction,
				removeFormControlAction,
				removeFormControlsAction,
				submitFormAsyncAction,
				updateFormControlAction,
			} = actionMap;
			if (!!submitFormAction) {
				this.submitForm = <TPayload extends FormActionPayload.ISubmit<TFormValue>>(
					payload?: TPayload
				) => {
					//@ts-ignore
					this.store.dispatch(new submitFormAction(payload));
				};
			}
			if (!!removeFormControlAction) {
				this.removeFormControl = <
					TPayload extends FormActionPayload.IRemoveGroupElement<TFormValue>
				>(
					payload: TPayload
				) => {
					//@ts-ignore
					this.store.dispatch(new removeFormControlAction(payload));
				};
			}
			if (!!removeFormControlsAction) {
				this.removeFormControls = <
					TPayload extends FormActionPayload.IRemoveGroupElements<TFormValue>
				>(
					payload: TPayload
				) => {
					//@ts-ignore
					this.store.dispatch(new removeFormControlsAction(payload));
				};
			}
			if (!!addFormControlAction) {
				this.addFormControl = <
					TPayload extends FormActionPayload.IAddGroupElement<TFormValue>
				>(
					payload: TPayload
				) => {
					//@ts-ignore
					this.store.dispatch(new addFormControlAction(payload));
				};
			}
			if (!!addFormControlsAction) {
				this.addFormControls = <
					TPayload extends FormActionPayload.IAddGroupElements<TFormValue>
				>(
					payload: TPayload
				) => {
					//@ts-ignore
					this.store.dispatch(new addFormControlsAction(payload));
				};
			}
			if (!!updateFormAction) {
				this.updateForm = <TPayload extends FormActionPayload.IUpdateValue<TFormValue>>(
					payload: TPayload
				) => {
					//@ts-ignore
					this.store.dispatch(new updateFormAction(payload));
				};
			}
			if (!!updateFormControlAction) {
				this.updateFormControl = <
					TPayload extends FormActionPayload.IUpdateGroupElement<TFormValue>
				>(
					payload: TPayload
				) => {
					//@ts-ignore
					this.store.dispatch(new updateFormControlAction(payload));
				};
			}
			if (!!submitFormAsyncAction) {
				this.submitFormAsync = <TResponse = undefined>(
					payload: IHttpOptions<TFormValue>
				) => {
					const consumer = new HttpConsumer<TResponse, TFormValue>(payload);

					this.store.dispatch(
						//@ts-ignore
						new submitFormAsyncAction({
							consumer: consumer,
						})
					);

					return consumer;
				};
			}
		}
	}
	/**
	 * Form controls
	 */
	public readonly formControls$: Observable<FormGroupControls<TFormValue>>;

	/**
	 * Form controls keys array
	 */
	public readonly formControlsKeys$: Observable<(keyof TFormValue)[]>;

	/**
	 * True than form is valid
	 */
	public readonly formIsValid$: Observable<boolean>;

	/**
	 *
	 */
	public readonly formValue$: Observable<TFormValue>;

	//#region Selectors

	public hasControl: (controlKey: keyof TFormValue) => Observable<boolean>;
	public hasError: (controlKey: keyof TFormValue) => Observable<boolean>;
	public controlValue: (
		controlKey: keyof TFormValue
	) => Observable<TFormValue[keyof TFormValue] | null>;
	public controlState: (
		controlKey: keyof TFormValue
	) => Observable<FormState<TFormValue[keyof TFormValue]> | null>;

	//#endregion Selectors

	//#region Actions

	public submitForm = <TPayload extends FormActionPayload.ISubmit<TFormValue>>(
		_payload?: TPayload
	) => {};
	public removeFormControl = <TPayload extends FormActionPayload.IRemoveGroupElement<TFormValue>>(
		_payload: TPayload
	) => {};
	public addFormControl = <TPayload extends FormActionPayload.IAddGroupElement<TFormValue>>(
		_payload: TPayload
	) => {};
	public updateFormControl = <TPayload extends FormActionPayload.IUpdateGroupElement<TFormValue>>(
		_payload: TPayload
	) => {};
	public removeFormControls = <
		TPayload extends FormActionPayload.IRemoveGroupElements<TFormValue>
	>(
		_payload: TPayload
	) => {};
	public addFormControls = <TPayload extends FormActionPayload.IAddGroupElements<TFormValue>>(
		_payload: TPayload
	) => {};
	public updateForm = <TPayload extends FormActionPayload.IUpdateValue<TFormValue>>(
		_payload: TPayload
	) => {};
	public submitFormAsync = <TResponse>(
		_payload: IHttpOptions<TFormValue>
		//@ts-ignore
	): HttpConsumer<TResponse, TFormValue> => {};

	//#endregion Actions
}
