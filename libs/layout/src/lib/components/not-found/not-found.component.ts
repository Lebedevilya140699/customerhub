import { Location } from '@angular/common';
import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'hh-not-found',
	templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
	constructor(private readonly location: Location) {}

	@HostBinding('class') class = 'hh--error';

	public back(): void {
		this.location.back();
	}
}
