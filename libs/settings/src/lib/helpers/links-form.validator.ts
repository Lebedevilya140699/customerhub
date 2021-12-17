import { FormGroupState, StateUpdateFns, updateGroup, validate } from 'ngrx-forms';
import { LinksForm } from '@core/platform';
import { required } from 'ngrx-forms/validation';
import { LinksFormState } from '../interfaces/links-form.state';
import { link } from '@core/common';

export module LinksFormValidator {
	export const createValidator: (state: LinksFormState) => FormGroupState<LinksForm> = (
		state: LinksFormState
	) => {
		const updateFns: StateUpdateFns<LinksForm> = {
			link: validate(link, required),
		};

		return updateGroup<LinksForm>(state, updateFns);
	};
}
