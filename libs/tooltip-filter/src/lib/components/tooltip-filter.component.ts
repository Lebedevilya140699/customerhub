import {
	Component,
	HostBinding,
	Input,
	Output,
	EventEmitter,
	HostListener,
	ElementRef,
} from '@angular/core';
import { TooltipFilterType } from '@core/tooltip-filter';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'hh-tooltip-filter',
	templateUrl: './tooltip-filter.component.html',
})
export class TooltipFilterComponent {
	@Input()
	public set type(type: TooltipFilterType) {
		this._type = type;
	}

	public get type(): TooltipFilterType {
		return this._type;
	}

	public get tooltip(): string {
		return this._tooltip;
	}

	@Input()
	public set tooltip(value: string) {
		this._tooltip = value;
	}

	public get checked(): boolean {
		return this._checked;
	}

	@Input()
	public set checked(value: boolean) {
		this._checked = coerceBooleanProperty(value);
	}

	@HostBinding('class') class = 'hh--tooltip-filter__container';

	@HostListener('document:click', ['$event.target'])
	public onClick(target: EventTarget) {
		const clickedInside = this.elementRef.nativeElement.contains(target);
		if (!clickedInside) {
			this.triggerChecked();
		}
	}

	@Output()
	public readonly clicked: EventEmitter<TooltipFilterType> = new EventEmitter<TooltipFilterType>();

	constructor(private readonly elementRef: ElementRef) {}

	private _type: TooltipFilterType = 'red';
	private _tooltip = '';
	private _checked: boolean = false;

	public triggerChecked() {
		this.checked = !this.checked;

		this.clicked.emit(this.type);
	}
}
