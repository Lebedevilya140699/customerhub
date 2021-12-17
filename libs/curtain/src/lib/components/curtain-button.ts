import { Component } from '@angular/core';

@Component({
	selector: 'hh-curtain-button',
	template: `<ng-content></ng-content>`,
	host: {
		class: 'hh--curtain__button',
	},
})
export class CurtainButton {
	constructor() {}
}
