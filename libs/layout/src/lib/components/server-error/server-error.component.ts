import { Location } from '@angular/common';
import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'hh-server-error',
	templateUrl: './server-error.component.html',
})
export class ServerErrorComponent {
	constructor(private readonly location: Location) {}

	@HostBinding('class') class = 'hh--error';

	public back(): void {
		this.location.back();
	}
}
