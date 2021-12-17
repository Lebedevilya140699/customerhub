import { FormGroupState } from 'ngrx-forms';
import { CertificateForm } from '@core/platform';

export interface CertificateFormState extends FormGroupState<CertificateForm> {}

export interface ICertificateFormState {
	form: CertificateFormState;
}
