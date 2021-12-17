import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { takeNotNil } from '@core/common';
import { initialize, reset, SessionFacade } from '@core/session';
import { from, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { UserService } from '@core/user';

@Component({
	template: `<router-outlet></router-outlet>`,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class PrivateContainer implements OnInit, OnDestroy {
	private readonly _destroy$: Subject<void>;

	constructor(
		private readonly session: SessionFacade,
		private readonly injector: Injector,
		private readonly userService: UserService
	) {
		this._destroy$ = new Subject<void>();
	}

	public ngOnInit(): void {
		this.session.userId$
			.pipe(
				takeNotNil(1),
				takeUntil(this._destroy$),
				tap((userId) => this.userService.getResumeById(userId)),
				switchMap((userId: number) => this.userService.getById(userId!))
			)
			.subscribe();
		this.session.userId$
			.pipe(
				takeNotNil(1),
				takeUntil(this._destroy$),
				switchMap((userId: number) => this.userService.getResumeById(userId))
			)
			.subscribe();
		this.session.accessToken$
			.pipe(
				takeNotNil(1),
				takeUntil(this._destroy$),
				switchMap(() => from(initialize(this.injector, this._destroy$))),
				take(1)
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
		reset(this.injector);
	}
}
