import { FormGroupState, StateUpdateFns, updateGroup, validate } from 'ngrx-forms';
import { ContactsForm } from '@core/platform';
import { ContactsFormState } from '../interfaces/contacts-form.state';
import { required } from 'ngrx-forms/validation';

export module ContactsFormValidator {
	export const createValidator: (state: ContactsFormState) => FormGroupState<ContactsForm> = (
		state: ContactsFormState
	) => {
		const updateFns: StateUpdateFns<ContactsForm> = {
			phone: validate(required),
			email: validate(required),
		};

		return updateGroup<ContactsForm>(state, updateFns);
	};
}
