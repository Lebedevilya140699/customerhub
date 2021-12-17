import { CertificateForm, ResumeForm } from '@core/platform';
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
import { CertificateFormState } from '../../../interfaces/certificate-form.state';
import { CertificateFormAction } from './certificates-form.actions';
import { CertificateFormValidator } from '../../../helpers/certificate-form.validator';
import { LinksFormAction } from '../../contacts/+state/links-form.actions';

export module CertificateFormReducer {
	export const CERTIFICATE_FORM_FEATURE_KEY = 'CertificateForm';

	export interface CertificateFormPartialState {
		readonly [CERTIFICATE_FORM_FEATURE_KEY]: CertificateFormState;
	}

	export const initialState = createFormGroupState<CertificateForm>(
		CERTIFICATE_FORM_FEATURE_KEY,
		{
			name: undefined,
			expirationAt: undefined,
		}
	);

	export function reducer(
		state: CertificateFormState = initialState,
		action: CertificateFormAction
	): CertificateFormState {
		state = formGroupReducer(state, action);
		switch (action.type) {
			case CertificateFormAction.CertificateFormActions.SUBMITTED: {
				state = markAsSubmitted(state);
				break;
			}
			case CertificateFormAction.CertificateFormActions.UPDATE: {
				state = setValue(state, action.payload.value);
				break;
			}
			case CertificateFormAction.CertificateFormActions.ADD_CONTROL: {
				state = addGroupControl(state, action.payload.name, action.payload.value);
				break;
			}
			case CertificateFormAction.CertificateFormActions.REMOVE_CONTROL: {
				state = removeGroupControl(state, action.payload.key);
				break;
			}
			case CertificateFormAction.CertificateFormActions.RESET_FORM: {
				state = initialState;
				break;
			}
			case CertificateFormAction.CertificateFormActions.UPDATE_CONTROL: {
				state = updateGroup(state, {
					[action.payload.name]: setValue(action.payload.value),
				});
				break;
			}
			case CertificateFormAction.CertificateFormActions.UPDATE_FORM_STATE: {
				state = markAsTouched(state);
				break;
			}
		}

		return CertificateFormValidator.createValidator(state);
	}
}
