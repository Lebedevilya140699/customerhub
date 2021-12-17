import { Component } from '@angular/core';

@Component({
	selector: 'hh-curtain-subtitle',
	template: `<p><ng-content></ng-content></p>`,
	host: {
		class: 'hh--curtain__subtitle',
	},
})
export class CurtainSubtitle {}
