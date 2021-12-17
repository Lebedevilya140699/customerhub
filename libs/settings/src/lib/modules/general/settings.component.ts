import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionFacade } from '@core/session';
import { ResumeCollectionService } from '@core/user';
import { filterNil } from '@core/common';
import { mergeMap, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Resume } from '@core/domain';
import { IBreadcrumbs } from '@core/breadcrumbs';
import { SettingsFacade } from '../../+state/settings.facade';
import * as fileSaver from 'file-saver';
import { ProfileService } from '@core/profile';

@Component({
	selector: 'hh-settings',
	templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
	public readonly resume$: Observable<Resume>;
	public available = false;
	public fullName: string | null | undefined;
	public userId = '';
	public isDownloading = false;
	public breadcrumbs: IBreadcrumbs[] = [
		{
			displayValue: 'Dashboard',
			leading: false,
			route: '/',
		},
		{
			displayValue: 'Settings',
			leading: true,
		},
	];

	private sub: Subscription = Subscription.EMPTY;
	private stateSub: Subscription = Subscription.EMPTY;
	private approvalSub: Subscription = Subscription.EMPTY;

	constructor(
		private readonly settingsFacade: SettingsFacade,
		private readonly session: SessionFacade,
		private readonly resumeCollectionService: ResumeCollectionService,
		public profileService: ProfileService
	) {
		this.resume$ = this.session.userId$.pipe(
			filterNil,
			mergeMap((userId: number | null) => this.resumeCollectionService.resume(userId!)),
			filterNil
		);
	}

	ngOnInit() {
		this.stateSub = this.settingsFacade.state$
			.pipe(
				tap((state) => {
					if (state.isTouched) {
						this.available = true;

						return;
					}

					this.available = false;
				})
			)
			.subscribe();

		this.resume$.subscribe((data) => (this.fullName = data.personalInfo?.fullName));
	}

	public triggerAvailable() {
		this.available = !this.available;
	}

	public submit() {
		if (this.available) {
			this.approvalSub = this.settingsFacade.submitPart().subscribe();
			this.available = false;
		}
	}

	download() {
		this.isDownloading = true;
		this.session.userId$.pipe(filterNil).subscribe((data) => (this.userId = data.toString()));
		this.sub = this.profileService.downloadFile(this.userId).subscribe((response) => {
			let blob: Blob = new Blob([response], { type: 'text/json; charset=utf-8' });
			fileSaver.saveAs(blob, `${this.fullName}.docx`);
			this.isDownloading = false;
		});
	}

	downloadBages() {
		this.isDownloading = true;
		//TODO: На каждую подписку должна быть отписка
		this.session.userId$.pipe(filterNil).subscribe((data) => (this.userId = data.toString()));
		this.sub = this.profileService.downloadFile(this.userId).subscribe((response) => {
			let blob: Blob = new Blob([response], { type: 'text/json; charset=utf-8' });
			fileSaver.saveAs(blob, `${this.fullName}_bages.docx`);
			this.isDownloading = false;
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
		this.stateSub.unsubscribe();
		this.approvalSub.unsubscribe();
	}
}
