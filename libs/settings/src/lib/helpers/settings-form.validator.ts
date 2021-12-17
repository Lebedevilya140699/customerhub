import { FormGroupState, StateUpdateFns, updateGroup } from 'ngrx-forms';
import { ResumeForm } from '@core/platform';
import { ResumeFormState } from '../interfaces/resume-form.state';

export module ResumeFormValidator {
	export const createValidator: (state: ResumeFormState) => FormGroupState<ResumeForm> = (
		state: ResumeFormState
	) => {
		const updateFns: StateUpdateFns<ResumeForm> = {
			/*firstName: validate(required),
			lastName: validate(required),
			birthDate: validate(required),
			position: validate(required),
			country: validate(required),
			city: validate(required),*/
		};

		return updateGroup<ResumeForm>(state, updateFns);
	};
}
