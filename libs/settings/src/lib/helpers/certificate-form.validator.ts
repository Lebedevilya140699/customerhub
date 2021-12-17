import { FormGroupState, StateUpdateFns, updateGroup, validate } from 'ngrx-forms';
import { CertificateForm } from '@core/platform';
import { required } from 'ngrx-forms/validation';
import { CertificateFormState } from '../interfaces/certificate-form.state';

export module CertificateFormValidator {
	export const createValidator: (
		state: CertificateFormState
	) => FormGroupState<CertificateForm> = (state: CertificateFormState) => {
		const updateFns: StateUpdateFns<CertificateForm> = {
			name: validate(required),
		};

		return updateGroup<CertificateForm>(state, updateFns);
	};
}
