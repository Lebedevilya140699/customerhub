import { Component, OnInit } from '@angular/core';
import { SessionFacade } from '@core/session';

@Component({
	selector: 'hh-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(private readonly sessionFacade: SessionFacade) {}

	public ngOnInit(): void {
		this._init();
	}

	private _init(): void {
		this.sessionFacade.loadSession();
	}
}
