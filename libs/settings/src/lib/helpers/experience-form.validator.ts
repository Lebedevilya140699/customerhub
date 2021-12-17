import { FormGroupState, StateUpdateFns, updateGroup, validate } from 'ngrx-forms';
import { ExperienceForm } from '@core/platform';
import { required } from 'ngrx-forms/validation';
import { ExperienceFormState } from '../interfaces/experience-form.state';

export module ExperienceFormValidator {
	export const createValidator: (state: ExperienceFormState) => FormGroupState<ExperienceForm> = (
		state: ExperienceFormState
	) => {
		const updateFns: StateUpdateFns<ExperienceForm> = {
			name: validate(required),
		};

		return updateGroup<ExperienceForm>(state, updateFns);
	};
}
