import { Injectable } from '@angular/core';
import { StoreFacade } from '@core/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProfileReducer } from './profile.reducer';
import { ProfileAction } from './profile.actions';
import { ProfileSelector } from './profile.selectors';
import { Dispatcher } from '@core/common';
import downloadCv = ProfileAction.downloadCv;
import selectCvDownloaded = ProfileSelector.selectCvDownloaded;
import { IProfileState } from '../interfaces/profile-state';

export interface ProfileFacade extends Dispatcher<ProfileAction.Map> {
	id$: Observable<number | null>;
}

@Injectable()
export class ProfileFacade extends StoreFacade<
	ProfileReducer.ProfilePartialState,
	IProfileState,
	ProfileAction.ProfileActions,
	ProfileAction
> {
	constructor(store: Store<ProfileReducer.ProfilePartialState>) {
		super(store, ProfileSelector.map, ProfileAction.map, ProfileReducer.PROFILE_FEATURE_KEY);
	}

	downloadUserCv(id: string, name: string) {
		this.store.dispatch(downloadCv({ payload: { id, name } }));
	}

	isDownloadedUserCv(): Observable<any> {
		return this.store.select(selectCvDownloaded);
	}
}
