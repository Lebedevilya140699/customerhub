import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { BaseQueryMap } from '@core/common';
import { ProfileReducer } from './profile.reducer';
import { IProfileState } from '../interfaces/profile-state';

export module ProfileSelector {
	export const selectState = createFeatureSelector<
		ProfileReducer.ProfilePartialState,
		IProfileState
	>(ProfileReducer.PROFILE_FEATURE_KEY);

	export const selectId = createSelector<
		ProfileReducer.ProfilePartialState,
		IProfileState,
		number | null
	>(selectState, (state) => state.id);

	export const selectCv = createSelector<
		ProfileReducer.ProfilePartialState,
		IProfileState,
		string | null
	>(selectState, (state) => state.cv);

	export const selectCvDownloaded = createSelector<
		ProfileReducer.ProfilePartialState,
		IProfileState,
		boolean | null
	>(selectState, (state) => state.isDownloaded);

	export interface Map extends BaseQueryMap<ProfileReducer.ProfilePartialState, IProfileState> {
		selectId: MemoizedSelector<ProfileReducer.ProfilePartialState, number | null>;
		selectCv: MemoizedSelector<ProfileReducer.ProfilePartialState, string | null>;
		selectCvDownloaded: MemoizedSelector<ProfileReducer.ProfilePartialState, boolean | null>;
	}

	export const map: Map = {
		selectId,
		selectCv,
		selectCvDownloaded,
	};
}
