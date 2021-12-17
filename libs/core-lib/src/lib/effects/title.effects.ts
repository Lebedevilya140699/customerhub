import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { String } from 'typescript-string-operations';
import { TitleService } from '../services/title.service';

@Injectable()
export class TitleEffects {
	public readonly title$: Observable<void> = createEffect(
		() =>
			this.actions.pipe(
				ofType(ROUTER_NAVIGATED),
				map((action: RouterNavigatedAction) => action.payload.event),
				map((event: NavigationEnd) => {
					const s = event.urlAfterRedirects
						.replace(this._reg, '')
						.split('/', 3)
						.filter((x) => !String.IsNullOrWhiteSpace(x));

					if (s.length > 0) {
						return s.join('.');
					} else {
						return '';
					}
				}),
				switchMap((path?: string) => {
					return this.titleService.getPath(path);
				}),
				map((title: string) => {
					this.title.setTitle(title);
				})
			),
		{ dispatch: false }
	);

	private readonly _reg: RegExp = /\?.*/;

	constructor(
		private readonly actions: Actions,
		private readonly titleService: TitleService,
		private readonly title: Title
	) {}
}
