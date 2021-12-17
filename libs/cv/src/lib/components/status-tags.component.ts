import { Component, Input, OnInit } from '@angular/core';
import { EmployeeStatusEnum, getReadableStatus } from '@core/employees';
import { Observable } from 'rxjs';
import { User } from '@core/domain';
import { State, Store } from '@ngrx/store';
import { ProfileFacade, ProfileService } from '@core/profile';

@Component({
	selector: 'hh-status-tags',
	templateUrl: './status-tags.component.html',
})
export class StatusTagsComponent implements OnInit {
	@Input() status = EmployeeStatusEnum.Busy;
	@Input() updated = '';
	@Input() email = '';
	@Input() id = '';
	@Input() fullname = '';
	@Input() role = '';
	public user$?: Observable<User | null>;
	public sessionEmail: string | null = '';
	public sessionRole: string | null = '';
	public isDownloading = false;

	constructor(
		public profileService: ProfileService,
		private store: Store<State<string>>,
		private readonly profileFacade: ProfileFacade
	) {}

	public get readableStatus() {
		return getReadableStatus(this.status);
	}

	public get isBusy() {
		return this.status === EmployeeStatusEnum.Busy;
	}

	public get isAvailable() {
		return this.status === EmployeeStatusEnum.Available;
	}

	ngOnInit(): void {
		this.store
			.select((state) => state)
			// @ts-ignore
			.subscribe((data) => localStorage.setItem('id', data.session.tokenPayload.email));

		this.store
			.select((state) => state)
			// @ts-ignore
			.subscribe((data) => localStorage.setItem('role', data.session.tokenPayload.roles));
		this.sessionEmail = localStorage.getItem('id');
		this.sessionRole = localStorage.getItem('role');
	}

	download() {
		this.isDownloading = true;
		this.profileFacade.downloadUserCv(this.id, this.fullname);
		this.profileFacade.isDownloadedUserCv().subscribe((data) => {
			if (data === true) {
				this.isDownloading = false;
			}
		});
	}

	downloadBages() {
		this.isDownloading = true;
		this.profileFacade.downloadUserCv(this.id, `${this.fullname}_bages`);
		this.profileFacade.isDownloadedUserCv().subscribe((data) => {
			if (data === true) {
				this.isDownloading = false;
			}
		});
	}
}
