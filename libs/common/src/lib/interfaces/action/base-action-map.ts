import { Constructible } from '@nartc/automapper';
import { ActionCreator, FunctionWithParametersType } from '@ngrx/store/src/models';
import { BaseAction } from '../../models/action';

export interface BaseActionMap<
	TActionType extends string = any,
	TAction extends BaseAction<TActionType> = any
> {
	reset?: Constructible<TAction> | FunctionWithParametersType<any> | ActionCreator<TActionType>;
}
