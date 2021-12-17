import { OverlayRef } from '@angular/cdk/overlay';
import { TemplateRef, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurtainConfig } from './curtain-config';

export class CurtainRef<R = any, T = any> implements ICloseable<R> {
	public get afterClosed$(): Observable<OverlayCloseEvent<R>> {
		return this._afterClosed.asObservable();
	}

	private readonly _afterClosed: Subject<OverlayCloseEvent<R>>;

	constructor(
		public readonly overlay: OverlayRef,
		public readonly config: CurtainConfig,
		public readonly content: CurtainContentType | null,
		public readonly data?: T extends undefined ? undefined : T
	) {
		this._afterClosed = new Subject<OverlayCloseEvent<R>>();
		if (config.handleBackdrop) {
			overlay
				.backdropClick()
				.pipe(takeUntil(this._afterClosed))
				.subscribe(() => {
					this._close(OverlayCloseEventType.BACKDROP);
				});
		}
		overlay
			.keydownEvents()
			.pipe(takeUntil(this._afterClosed))
			.subscribe((event: KeyboardEvent) => {
				if (event.code === 'Escape') {
					this._close(OverlayCloseEventType.KEY);
				}
			});
	}

	public close(data?: R): void {
		this._close(OverlayCloseEventType.CLOSE, data);
	}

	private _close(type: OverlayCloseEventType, data?: R): void {
		this.overlay.dispose();
		this._afterClosed.next(new OverlayCloseEvent(type, data));
		this._afterClosed.complete();
	}
}

export enum OverlayCloseEventType {
	BACKDROP,
	CLOSE,
	KEY,
}

export class OverlayCloseEvent<R = any> {
	constructor(public readonly type: OverlayCloseEventType, public readonly data?: R) {}
}

export type CurtainContentType = TemplateRef<any> | Type<any>;

export interface ICloseable<R = any> {
	close: IClose<R>;
}

export interface CurtainContext<R = any, T = any> extends ICloseable<R> {
	data?: T;
}

export interface IClose<R = any> {
	(data?: R): void;
}
