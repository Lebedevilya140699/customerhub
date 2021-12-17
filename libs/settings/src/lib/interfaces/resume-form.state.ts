import { FormGroupState } from 'ngrx-forms';
import { ResumeForm } from '@core/platform';

export interface ResumeFormState extends FormGroupState<ResumeForm> {}

export interface ISettingsState {
	form: ResumeFormState;
}
