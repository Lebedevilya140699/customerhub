import { LinksForm } from '@core/platform';
import {
	addGroupControl,
	createFormGroupState,
	formGroupReducer,
	markAsSubmitted,
	markAsTouched,
	markAsUntouched,
	removeGroupControl,
	setValue,
	updateGroup,
} from 'ngrx-forms';
import { LinksFormState } from '../../../interfaces/links-form.state';
import { LinksFormAction } from './links-form.actions';
import { LinksFormValidator } from '../../../helpers/links-form.validator';

export module LinksFormReducer {
	export const LINKS_FORM_FEATURE_KEY = 'LinksForm';

	export interface LinksFormPartialState {
		readonly [LINKS_FORM_FEATURE_KEY]: LinksFormState;
	}

	export const initialState = createFormGroupState<LinksForm>(LINKS_FORM_FEATURE_KEY, {
		link: undefined,
	});

	export function reducer(
		state: LinksFormState = initialState,
		action: LinksFormAction
	): LinksFormState {
		state = formGroupReducer(state, action);
		switch (action.type) {
			case LinksFormAction.LinksFormActions.SUBMITTED: {
				state = initialState;
				break;
			}
			case LinksFormAction.LinksFormActions.UPDATE: {
				state = setValue(state, action.payload.value);
				break;
			}
			case LinksFormAction.LinksFormActions.ADD_CONTROL: {
				state = addGroupControl(state, action.payload.name, action.payload.value);
				break;
			}
			case LinksFormAction.LinksFormActions.REMOVE_CONTROL: {
				state = removeGroupControl(state, action.payload.key);
				break;
			}
			case LinksFormAction.LinksFormActions.RESET_FORM: {
				state = initialState;
				break;
			}
			case LinksFormAction.LinksFormActions.UPDATE_CONTROL: {
				state = updateGroup(state, {
					[action.payload.name]: setValue(action.payload.value),
				});
				break;
			}
			case LinksFormAction.LinksFormActions.UPDATE_FORM_STATE: {
				state = markAsTouched(state);
				break;
			}
		}

		return LinksFormValidator.createValidator(state);
	}
}
