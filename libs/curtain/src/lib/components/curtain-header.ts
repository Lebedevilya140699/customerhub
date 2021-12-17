import { Component } from '@angular/core';

@Component({
	selector: 'hh-curtain-header',
	template: `<ng-content></ng-content>`,
	host: {
		class: 'hh--curtain__header',
	},
})
export class CurtainHeader {
	constructor() {}
}
