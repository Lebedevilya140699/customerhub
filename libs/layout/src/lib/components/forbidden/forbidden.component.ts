import { Location } from '@angular/common';
import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'hh-forbidden',
	templateUrl: './forbidden.component.html',
})
export class ForbiddenComponent {
	constructor(private readonly location: Location) {}

	@HostBinding('class') class = 'hh--error';

	public back(): void {
		this.location.back();
	}
}
