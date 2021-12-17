import { animate, AnimationBuilder, AnimationMetadata, query, style } from '@angular/animations';
import { Component, ElementRef, Injector, OnInit, TemplateRef } from '@angular/core';
import { CurtainContentType, CurtainContext, CurtainRef } from '../models/curtain-ref';
import { CurtainComponentContentType } from '../types';

@Component({
	selector: 'hh-curtain',
	template: `
		<ng-container [ngSwitch]="curtainComponentType">
			<ng-container *ngSwitchCase="'component'">
				<ng-container *ngComponentOutlet="$any(content); injector: injector"></ng-container>
			</ng-container>
			<ng-container *ngSwitchCase="'template'">
				<ng-container *ngTemplateOutlet="content; context: context"></ng-container>
			</ng-container>
		</ng-container>
	`,
	host: {
		class: 'hh--curtain',
	},
})
export class Curtain<R = any, T = any> implements OnInit {
	public curtainComponentType: CurtainComponentContentType;
	public readonly content: CurtainContentType;
	public readonly context?: CurtainContext<R, T>;

	constructor(
		public readonly overlayRef: CurtainRef<R, T>,
		private readonly animationBuilder: AnimationBuilder,
		private readonly elementRef: ElementRef,
		public readonly injector: Injector
	) {
		this.content = overlayRef.content!;
		if (this.content instanceof TemplateRef) {
			this.curtainComponentType = 'template';
			this.context = {
				close: this.close.bind(this),
				data: this.overlayRef.data,
			};
		} else {
			this.curtainComponentType = 'component';
		}
	}

	public ngOnInit(): void {
		const animations: AnimationMetadata[] = [
			query(':self', style({ transform: 'translate3d(100%, 0, 0)' })),
			animate('147ms cubic-bezier(0.2, 0.2, 0.38, 0.9)'),
		];

		const factory = this.animationBuilder.build(animations);
		const player = factory.create(this.elementRef.nativeElement);
		player.play();
	}

	public close(data?: R): void {
		const animations: AnimationMetadata[] = [
			query(':self', style({ transform: 'translate3d(0, 0, 0)' })),
			animate('147ms cubic-bezier(0.2, 0.2, 0.38, 0.9)'),
		];

		const factory = this.animationBuilder.build(animations);
		const player = factory.create(this.elementRef.nativeElement);

		player.onDone(() => {
			this.overlayRef.close(data);
		});

		player.play();
	}
}
