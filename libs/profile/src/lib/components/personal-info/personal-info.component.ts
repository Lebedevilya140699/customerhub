import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '@core/domain';

@Component({
	selector: 'hh-personal-info',
	templateUrl: './personal-info.component.html',
})
export class PersonalInfoComponent {
	@Input()
	public set user(value: User) {
		this._user = value;
		console.warn('user', value);
		this.title.setTitle(value?.personalInfo?.fullName!);
	}

	public get user(): User {
		return this._user;
	}

	private _user: User = {};

	constructor(private readonly title: Title) {}
}
