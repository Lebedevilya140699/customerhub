import { createReducer, on } from '@ngrx/store';
import { InferAction } from '@core/common';
import { ProfileAction } from './profile.actions';
import { IProfileState } from '../interfaces/profile-state';

export module ProfileReducer {
	export const PROFILE_FEATURE_KEY = 'profile';

	export interface ProfilePartialState {
		readonly [PROFILE_FEATURE_KEY]: IProfileState;
	}

	export const initialState: IProfileState = {
		cv: null,
		id: null,
		isLoading: false,
		loaded: true,
		isDownloaded: false,
	};

	export const reducer = createReducer<IProfileState, InferAction<ProfileAction>>(
		initialState,
		on(ProfileAction.setId, (state, { payload }) => ({
			...state,
			id: payload,
		})),

		on(ProfileAction.downloadCv, (state, { payload }) => ({
			...state,
			cv: payload,
			loaded: true,
		})),

		on(ProfileAction.downloadCvSuccess, (state, { payload }) => ({
			...state,
			isDownloaded: payload.isDownloaded,
		}))
	);
}
