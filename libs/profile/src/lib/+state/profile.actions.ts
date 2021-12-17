import {
	BaseActionMap,
	createPayloadAction,
	InferAction,
	PayloadActionCreator,
} from '@core/common';
import { ActionCreator, createAction } from '@ngrx/store';

export module ProfileAction {
	export enum ProfileActions {
		SET_ID = '[Profile] Set Id',
		RESET = '[Profile] Reset',
		DOWNLOAD_CV = '[Profile] Download CV',
		DOWNLOAD_CV_SUCCESS = '[Profile] Download CV Success',
	}

	export interface SetId extends PayloadActionCreator<ProfileActions.SET_ID, number> {}
	export interface DownloadCv
		extends PayloadActionCreator<ProfileActions.DOWNLOAD_CV, { id: string; name: string }> {}
	export interface Reset extends ActionCreator<ProfileActions.RESET> {}

	export const setId: SetId = createPayloadAction(ProfileActions.SET_ID);
	export const downloadCv: PayloadActionCreator<
		ProfileAction.ProfileActions.DOWNLOAD_CV,
		{ id: string; name: string }
	> = createPayloadAction(ProfileActions.DOWNLOAD_CV);

	export const downloadCvSuccess: PayloadActionCreator<
		ProfileAction.ProfileActions.DOWNLOAD_CV_SUCCESS,
		{ isDownloaded: boolean }
	> = createPayloadAction(ProfileActions.DOWNLOAD_CV_SUCCESS);

	export const reset: Reset = createAction(ProfileActions.RESET);

	export interface Map extends BaseActionMap<ProfileActions, InferAction<ProfileAction>> {
		setId: SetId;
		downloadCv: DownloadCv;
		reset: Reset;
	}

	export const map: {
		setId: ProfileAction.SetId;
		reset: ProfileAction.Reset;
		downloadCv: ProfileAction.DownloadCv;
	} = {
		setId,
		downloadCv,
		reset,
	};
}

export type ProfileAction = ProfileAction.SetId | ProfileAction.DownloadCv;
