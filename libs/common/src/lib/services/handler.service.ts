import { Injectable, Injector, Type } from '@angular/core';
import { BaseHandler } from './base-handler';

@Injectable()
export class HandlerService {
	private readonly handlersMap: Map<string, BaseHandler>;

	constructor(private readonly injector: Injector) {
		this.handlersMap = new Map<string, BaseHandler>();
	}

	public registerHandlers(map: Record<string, Type<BaseHandler>>) {
		Object.keys(map).forEach((key: string) => {
			this.handlersMap.set(key, this.injector.get(map[key]));
		});
	}

	public handle = (state: string) => this.handlersMap.get(state)?.handle();
}
