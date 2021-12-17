import { Component } from '@angular/core';
import { UserCollectionService } from '@core/user';
import { Observable } from 'rxjs';
import { User } from '@core/domain';
import { switchMap, tap } from 'rxjs/operators';
import { filterNil } from '@core/common';
import { IBreadcrumbs } from '@core/breadcrumbs';
import { ProfileFacade } from '../../+state/profile.facade';

@Component({
	selector: 'hh-profile',
	templateUrl: './profile.component.html',
})
export class ProfileComponent {
	public readonly user$: Observable<User | null>;
	public breadcrumbs: IBreadcrumbs[] = [
		{
			displayValue: 'Dashboard',
			leading: false,
			route: '/dashboard',
		},
		{
			displayValue: 'Employees',
			leading: false,
			route: '/employees',
		},
	];

	constructor(
		private readonly profileFacade: ProfileFacade,
		private readonly userCollectionService: UserCollectionService
	) {
		this.user$ = this.profileFacade.id$.pipe(
			filterNil,
			switchMap((userId: number) => this.userCollectionService.user(userId)),
			tap(
				(user) =>
					(this.breadcrumbs[2] = {
						displayValue: user?.personalInfo?.fullName!,
						leading: true,
					})
			)
		);
	}
}
