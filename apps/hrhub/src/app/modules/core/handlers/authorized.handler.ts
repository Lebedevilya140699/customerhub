import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseHandler } from '@core/common';
import { NavigationFacade } from '@core/navigation';

@Injectable()
export class AuthorizedHandler extends BaseHandler {
	constructor($injector: Injector) {
		super($injector);
	}

	public handle(): void {
		this.injector.get(Router).navigateByUrl('/');
		this.injector.get(NavigationFacade).reset();
	}
}
