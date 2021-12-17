import { Injectable, Injector } from '@angular/core';
import { DataAccessEffect, FileUtils, InferAction, takeNotNil } from '@core/common';
import { HttpService } from '@core/http';
import { Actions, createEffect } from '@ngrx/effects';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DataPersistence } from '@nrwl/angular';
import { Store } from '@ngrx/store';
import { concatMap, filter, map, mapTo } from 'rxjs/operators';
import { UserCollectionService, UserService } from '@core/user';
import { ProfileReducer } from './profile.reducer';
import { ProfileAction } from './profile.actions';
import { ProfileComponent, ProfileEndpoints } from '@core/profile';
import { of, pipe, throwError } from 'rxjs';
import { String } from 'typescript-string-operations';
import { ProfileService } from '../services/profile.service';
import * as fileSaver from 'file-saver';

@Injectable()
export class ProfileEffects extends DataAccessEffect<
	ProfileReducer.ProfilePartialState,
	ProfileAction,
	HttpService
> {
	public readonly navigation$ = createEffect(() => {
		return this.dataPersistence.navigation(ProfileComponent, {
			run: (a: ActivatedRouteSnapshot, _state?: ProfileReducer.ProfilePartialState) => {
				let userId: number | string | null = a.paramMap.get('id');

				if (!userId || String.IsNullOrWhiteSpace(userId)) {
					return throwError(new Error('User id not set'));
				} else {
					try {
						userId = parseInt(userId, 10);

						return this.userCollectionService.user(userId).pipe(
							concatMap((data) =>
								data === null
									? this.userService.getById(userId as number)
									: of(data)
							),
							mapTo(ProfileAction.setId({ payload: userId }))
						);
					} catch (e) {
						return throwError(new Error('User id must be a number'));
					}
				}
			},
			onError: (_a, _e) => {
				return this._handleError(_e, _a);
			},
		});
	});

	downloadCv$ = createEffect(() => {
		return this.dataPersistence.fetch(ProfileAction.ProfileActions.DOWNLOAD_CV, {
			run: (
				a: InferAction<ProfileAction.DownloadCv>,
				_state?: ProfileReducer.ProfilePartialState
			) => {
				return this.httpService
					.download(
						{ endpoint: ProfileEndpoints.DOWNLOAD, pathArgs: [a.payload.id] },
						({ result }) => {
							if (!!result) {
								FileUtils.download(result, `${a.payload.name}.docx`);
							}
						}
					)
					.pipe(
						takeNotNil(2),
						filter((data) => data.state === 2),
						map(() => {
							return ProfileAction.downloadCvSuccess({
								payload: { isDownloaded: true },
							});
						})
					);
			},
			onError: (_a, _e) => {
				return this._handleError(_e, _a);
			},
		});
	});

	constructor(
		dataPersistence: DataPersistence<ProfileReducer.ProfilePartialState>,
		store$: Store<ProfileReducer.ProfilePartialState>,
		actions$: Actions<ProfileAction>,
		private readonly httpService: HttpService,
		injector: Injector,
		private readonly userService: UserService,
		private readonly userCollectionService: UserCollectionService,
		public profileService: ProfileService
	) {
		super(dataPersistence, store$, actions$, httpService, injector);
	}
}
