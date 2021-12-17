import { Component, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'hh-grid',
	templateUrl: './grid.component.html',
})
export class GridComponent {
	@HostBinding('class') readonly classes = 'hh--grid';

	@Input()
	public set expanded(value: boolean) {
		this._expanded = coerceBooleanProperty(value);
	}

	private _expanded = false;

	@HostBinding('class.hh--grid--expanded')
	public get isExpanded(): boolean {
		return this._expanded;
	}
}
