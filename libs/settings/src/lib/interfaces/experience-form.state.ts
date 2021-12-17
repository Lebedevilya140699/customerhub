import { FormGroupState } from 'ngrx-forms';
import { ExperienceForm } from '@core/platform';

export interface ExperienceFormState extends FormGroupState<ExperienceForm> {}

export interface IExperienceFormState {
	form: ExperienceFormState;
}
