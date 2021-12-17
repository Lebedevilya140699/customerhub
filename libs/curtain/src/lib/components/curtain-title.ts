import { Component } from '@angular/core';

@Component({
	selector: 'hh-curtain-title',
	template: `<h4><ng-content></ng-content></h4>`,
	host: {
		class: 'hh--curtain__title',
	},
})
export class CurtainTitle {
	constructor() {}
}
