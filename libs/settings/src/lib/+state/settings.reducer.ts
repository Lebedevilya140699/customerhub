import { ResumeForm } from '@core/platform';
import {
	addGroupControl,
	createFormGroupState,
	formGroupReducer,
	markAsSubmitted,
	markAsUntouched,
	removeGroupControl,
	setValue,
	updateGroup,
} from 'ngrx-forms';
import { SettingsAction } from './settings.actions';
import { ResumeFormValidator } from '../helpers/settings-form.validator';
import { ResumeFormState } from '../interfaces/resume-form.state';

export module SettingsReducer {
	export const SETTINGS_FEATURE_KEY = 'settings';

	export interface SettingsPartialState {
		readonly [SETTINGS_FEATURE_KEY]: ResumeFormState;
	}

	export const initialState = createFormGroupState<ResumeForm>(SETTINGS_FEATURE_KEY, {
		firstName: undefined,
		lastName: undefined,
		birthDate: undefined,
		position: undefined,
		phone: undefined,
		email: undefined,
		links: undefined,
		client: undefined,
		role: undefined,
		startedAt: undefined,
		endedAt: undefined,
		description: undefined,
		responsibilities: undefined,
		summary: undefined,
	});

	export function reducer(
		state: ResumeFormState = initialState,
		action: SettingsAction
	): ResumeFormState {
		state = formGroupReducer(state, action);
		switch (action.type) {
			case SettingsAction.SettingsActions.SUBMITTED: {
				state = markAsSubmitted(state);
				state = markAsUntouched(state);
				break;
			}
			case SettingsAction.SettingsActions.UPDATE: {
				state = setValue(state, action.payload.value);
				break;
			}
			case SettingsAction.SettingsActions.ADD_CONTROL: {
				state = addGroupControl(state, action.payload.name, action.payload.value);
				break;
			}
			case SettingsAction.SettingsActions.REMOVE_CONTROL: {
				state = removeGroupControl(state, action.payload.key);
				break;
			}
			case SettingsAction.SettingsActions.RESET_FORM: {
				state = initialState;
				break;
			}
			case SettingsAction.SettingsActions.UPDATE_CONTROL: {
				state = updateGroup(state, {
					[action.payload.name]: setValue(action.payload.value),
				});
				break;
			}
		}

		return ResumeFormValidator.createValidator(state);
	}
}
