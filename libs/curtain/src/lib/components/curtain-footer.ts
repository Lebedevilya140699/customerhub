import { Component } from '@angular/core';

@Component({
	selector: 'hh-curtain-footer',
	template: ` <ng-content></ng-content> `,
	host: {
		class: 'hh--curtain__footer',
	},
})
export class CurtainFooter {}
