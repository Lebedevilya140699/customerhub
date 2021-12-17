import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { SessionFacade } from '@core/session';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs';
import { User } from '@core/domain';
import { UserCollectionService } from '@core/user';
import { filterNil } from '@core/common';
import { mergeMap } from 'rxjs/operators';

@Component({
	selector: 'hh-header',
	templateUrl: './header.component.html',
	animations: [
		trigger('showHideMenu', [
			transition(':enter', [
				style({ transform: 'translateX(110%)' }),
				animate(
					'147ms cubic-bezier(0.4, 0.14, 1, 1)',
					style({ transform: 'translateX(0)' })
				),
			]),
			transition(':leave', [
				style({ transform: 'translateX(0)' }),
				animate(
					'147ms cubic-bezier(0.4, 0.14, 1, 1)',
					style({ transform: 'translateX(110%)' })
				),
			]),
		]),
	],
})
export class HeaderComponent {
	@HostBinding('class') readonly class = 'hh--header';
	public isMenuActive = false;
	public readonly user$: Observable<User>;

	constructor(
		private readonly router: Router,
		private readonly session: SessionFacade,
		private readonly userCollectionService: UserCollectionService
	) {
		this.user$ = this.session.userId$.pipe(
			filterNil,
			mergeMap((userId: number) => this.userCollectionService.user(userId)),
			filterNil
		);
	}

	public openMenu(): void {
		this.isMenuActive = true;
	}

	public hideMenu(): void {
		this.isMenuActive = false;
	}

	public toggleMenu(): void {
		this.isMenuActive = !this.isMenuActive;
	}

	public navigate(path: string): void {
		this.router.navigateByUrl(path);
		this.isMenuActive = false;
	}

	public logout(): void {
		this.router.navigateByUrl('/auth/login');
		this.session.reset();
	}
}
