import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'hh-block',
	templateUrl: './block.component.html',
})
export class BlockComponent {
	constructor() {}

	@HostBinding('class') class = 'hh--block';
}
