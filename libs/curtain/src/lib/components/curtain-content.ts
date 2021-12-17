import { Component } from '@angular/core';

@Component({
	selector: 'hh-curtain-content',
	template: ` <ng-content></ng-content> `,
	host: {
		class: 'hh--curtain__content',
	},
})
export class CurtainContent {}
