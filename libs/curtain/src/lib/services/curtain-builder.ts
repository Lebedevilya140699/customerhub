import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injector } from '@angular/core';
import { Curtain } from '../components';
import { CurtainConfig, CurtainContentType, CurtainRef } from '../models';

export class CurtainBuilder {
	public config?: CurtainConfig;
	public injector?: Injector;
	public content?: CurtainContentType;

	constructor(
		private readonly defaultConfig: CurtainConfig,
		private readonly overlay: Overlay,
		private readonly _injector: Injector
	) {}

	public withConfig(config: Partial<CurtainConfig>): this {
		this.config = {
			...this.defaultConfig,
			...config,
		};

		return this;
	}

	public withInjector(injector: Injector): this {
		this.injector = injector;

		return this;
	}

	public withContent(content: CurtainContentType): this {
		this.content = content;

		return this;
	}

	public open<R = any, T = any>(data?: T extends undefined ? undefined : T): CurtainRef {
		if (!this.config) {
			this.config = this.defaultConfig;
		}

		if (!this.content) {
			throw new Error('Content must be specified. Use withContent method.');
		}

		const overlayRef = this.overlay.create(this.config);

		this.config.positionStrategy?.attach(overlayRef);
		this.config.scrollStrategy?.attach(overlayRef);

		const customRef = new CurtainRef<R, T>(overlayRef, this.config, this.content, data);

		const portalInjector = Injector.create({
			parent: this.injector ?? this._injector,
			providers: [
				{
					provide: CurtainRef,
					useValue: customRef,
				},
			],
		});

		overlayRef.attach(new ComponentPortal(Curtain, null, portalInjector));

		return customRef;
	}
}
