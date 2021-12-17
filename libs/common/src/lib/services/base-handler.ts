import { Injector } from '@angular/core';

export abstract class BaseHandler {
	protected constructor(public readonly injector: Injector) {}

	abstract handle(): void;
}
