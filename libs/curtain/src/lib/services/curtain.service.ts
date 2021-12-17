import { Overlay } from '@angular/cdk/overlay';
import { Inject, Injectable, Injector } from '@angular/core';
import { CURTAIN_CONFIG } from '../injection-tokens';
import { CurtainConfig } from '../models';
import { CurtainContentType, CurtainRef } from '../models';
import { CurtainBuilder } from './curtain-builder';

@Injectable()
export class CurtainService {
	constructor(
		private readonly overlay: Overlay,
		private readonly injector: Injector,
		@Inject(CURTAIN_CONFIG)
		private readonly defaultConfig: CurtainConfig
	) {}

	public build(): CurtainBuilder {
		return new CurtainBuilder(this.defaultConfig, this.overlay, this.injector);
	}

	public open<R = any, T = any>(
		content: CurtainContentType,
		data?: T extends undefined ? undefined : T,
		config: Partial<CurtainConfig> = this.defaultConfig,
		injector: Injector = this.injector
	): CurtainRef<R, T> {
		return this.build()
			.withConfig(config)
			.withContent(content)
			.withInjector(injector)
			.open(data);
	}
}
