import { Component, Input } from '@angular/core';
import { IBreadcrumbs } from '@core/breadcrumbs';

@Component({
	selector: 'hh-breadcrumbs',
	templateUrl: './breadcrumbs.html',
})
export class BreadcrumbsComponent {
	private _breadcrumbs: IBreadcrumbs[] = [
		{
			displayValue: 'Dashboard',
			leading: true,
			route: '/',
		},
	];

	public get breadcrumbs(): IBreadcrumbs[] {
		return this._breadcrumbs;
	}

	@Input()
	public set breadcrumbs(value: IBreadcrumbs[]) {
		this._breadcrumbs = value;
	}
}
