import { FormGroupState } from 'ngrx-forms';
import { ContactsForm, LinksForm, ResumeForm } from '@core/platform';
import { ResumeFormState } from './resume-form.state';

export interface LinksFormState extends FormGroupState<LinksForm> {}

export interface ILinksFormState {
	form: LinksFormState;
}
