import { FormGroupState } from 'ngrx-forms';
import { ContactsForm, ResumeForm } from '@core/platform';
import { ResumeFormState } from './resume-form.state';

export interface ContactsFormState extends FormGroupState<ContactsForm> {}

export interface IContactsFormState {
	form: ContactsFormState;
}
