import { ContactsForm, ResumeForm } from '@core/platform';
import {
	addGroupControl,
	createFormGroupState,
	formGroupReducer,
	markAsSubmitted,
	removeGroupControl,
	setValue,
	updateGroup,
} from 'ngrx-forms';
import { ContactsFormAction } from './contacts-form.actions';
import { ContactsFormState } from '../../../interfaces/contacts-form.state';
import { ContactsFormValidator } from '../../../helpers/contacts-form.validator';

export module ContactsFormReducer {
	export const CONTACTS_FORM_FEATURE_KEY = 'ContactsForm';

	export interface ContactsFormPartialState {
		readonly [CONTACTS_FORM_FEATURE_KEY]: ContactsFormState;
	}

	export const initialState = createFormGroupState<ContactsForm>(CONTACTS_FORM_FEATURE_KEY, {
		phone: undefined,
		email: undefined,
	});

	export function reducer(
		state: ContactsFormState = initialState,
		action: ContactsFormAction
	): ContactsFormState {
		state = formGroupReducer(state, action);
		switch (action.type) {
			case ContactsFormAction.ContactsFormActions.SUBMITTED: {
				state = markAsSubmitted(state);
				break;
			}
			case ContactsFormAction.ContactsFormActions.UPDATE: {
				state = setValue(state, action.payload.value);
				break;
			}
			case ContactsFormAction.ContactsFormActions.ADD_CONTROL: {
				state = addGroupControl(state, action.payload.name, action.payload.value);
				break;
			}
			case ContactsFormAction.ContactsFormActions.REMOVE_CONTROL: {
				state = removeGroupControl(state, action.payload.key);
				break;
			}
			case ContactsFormAction.ContactsFormActions.RESET_FORM: {
				state = initialState;
				break;
			}
			case ContactsFormAction.ContactsFormActions.UPDATE_CONTROL: {
				state = updateGroup(state, {
					[action.payload.name]: setValue(action.payload.value),
				});
				break;
			}
		}

		return ContactsFormValidator.createValidator(state);
	}
}
