import { Component } from '@angular/core';

@Component({
	selector: 'hh-curtain-close',
	template: `<mat-icon>close</mat-icon>`,
	host: {
		class: 'hh--curtain__close',
	},
})
export class CurtainClose {
	constructor() {}
}
