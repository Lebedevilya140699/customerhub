import { Component, Input } from '@angular/core';

@Component({
	selector: 'hh-profile-summary',
	templateUrl: './profile-summary.component.html',
})
export class ProfileSummaryComponent {
	private _summary: string[] = [];

	public get summary(): string[] {
		return this._summary;
	}

	@Input()
	public set summary(value: string[]) {
		this._summary = value;
	}
}
