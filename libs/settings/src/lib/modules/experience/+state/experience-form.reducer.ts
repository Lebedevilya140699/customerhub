import { ExperienceForm, ResumeForm } from '@core/platform';
import {
	addGroupControl,
	createFormGroupState,
	formGroupReducer,
	markAsSubmitted,
	markAsTouched,
	removeGroupControl,
	setValue,
	updateGroup,
} from 'ngrx-forms';
import { ExperienceFormState } from '../../../interfaces/experience-form.state';
import { ExperienceFormAction } from './experience-form.actions';
import { ExperienceFormValidator } from '../../../helpers/experience-form.validator';
import { LinksFormAction } from '../../contacts/+state/links-form.actions';

export module ExperienceFormReducer {
	export const EXPERIENCE_FORM_FEATURE_KEY = 'ExperienceForm';

	export interface ExperienceFormPartialState {
		readonly [EXPERIENCE_FORM_FEATURE_KEY]: ExperienceFormState;
	}

	export const initialState = createFormGroupState<ExperienceForm>(EXPERIENCE_FORM_FEATURE_KEY, {
		name: undefined,
		domain: undefined,
		projectName: undefined,
		role: undefined,
		startedAt: undefined,
		endedAt: undefined,
		description: undefined,
		responsibilities: undefined,
		technologies: undefined,
	});

	export function reducer(
		state: ExperienceFormState = initialState,
		action: ExperienceFormAction
	): ExperienceFormState {
		state = formGroupReducer(state, action);
		switch (action.type) {
			case ExperienceFormAction.ExperienceFormActions.SUBMITTED: {
				state = markAsSubmitted(state);
				break;
			}
			case ExperienceFormAction.ExperienceFormActions.UPDATE: {
				state = setValue(state, action.payload.value);
				break;
			}
			case ExperienceFormAction.ExperienceFormActions.ADD_CONTROL: {
				state = addGroupControl(state, action.payload.name, action.payload.value);
				break;
			}
			case ExperienceFormAction.ExperienceFormActions.REMOVE_CONTROL: {
				state = removeGroupControl(state, action.payload.key);
				break;
			}
			case ExperienceFormAction.ExperienceFormActions.RESET_FORM: {
				state = initialState;
				break;
			}
			case ExperienceFormAction.ExperienceFormActions.UPDATE_CONTROL: {
				state = updateGroup(state, {
					[action.payload.name]: setValue(action.payload.value),
				});
				break;
			}
			case ExperienceFormAction.ExperienceFormActions.UPDATE_FORM_STATE: {
				state = markAsTouched(state);
				break;
			}
		}

		return ExperienceFormValidator.createValidator(state);
	}
}
