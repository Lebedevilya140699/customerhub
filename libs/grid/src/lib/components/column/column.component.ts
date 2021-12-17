import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'hh-column',
	templateUrl: './column.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
	@Input()
	public set cols(value: number) {
		this._columns = coerceNumberProperty(value);
	}

	@HostBinding('class')
	public get setClasses(): string {
		return `hh--grid__column hh--grid__column-${this._columns}`;
	}

	private _columns = 1;

	@Input()
	public set collapsed(value: boolean) {
		this._collapsed = coerceBooleanProperty(value);
	}

	private _collapsed = false;

	@HostBinding('class.hh--grid__column--collapsed')
	public get isCollapsed(): boolean {
		return this._collapsed;
	}
}
