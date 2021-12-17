import { APP_INITIALIZER, StaticProvider, Type } from '@angular/core';
import { BaseHandler, BaseStorage, Endpoint, ENDPOINTS, MAPPING_PROFILES } from '@core/common';
import { StorageService } from 'ngx-webstorage/lib/core/interfaces/storageService';
import { initializeMapper } from '../helpers/initialize-mapper';
import { MapperProfileConstructor } from '../interfaces';

export class CoreLibModuleBuilder {
	public readonly endpoints: Map<string, Endpoint>;
	public readonly providers: StaticProvider[];
	public readonly profiles: MapperProfileConstructor[];
	public readonly handlers: Record<string, Type<BaseHandler>>;

	constructor() {
		this.endpoints = new Map<string, Endpoint>();
		this.providers = [];
		this.profiles = [];
		this.handlers = {} as Record<string, Type<BaseHandler>>;
	}

	public withEndpoint(
		endpointKey: string,
		configure: (endpoint: Endpoint) => void
	): CoreLibModuleBuilder {
		const endpoint = new Endpoint();
		configure(endpoint);

		this.endpoints.set(endpointKey, endpoint);

		return this;
	}

	public withStorage<T extends StorageService>(storage: Type<T>): CoreLibModuleBuilder {
		this.providers.push({
			provide: BaseStorage,
			useExisting: storage,
		});

		return this;
	}

	public withHandler(state: string, handler: Type<BaseHandler>): CoreLibModuleBuilder {
		this.handlers[state] = handler;

		return this;
	}

	public build(): CoreLibModuleBuilder {
		this.providers.push({
			provide: ENDPOINTS,
			useValue: this.endpoints,
		});
		this.providers.push({
			provide: MAPPING_PROFILES,
			useValue: this.profiles,
		});
		this.providers.push({
			provide: APP_INITIALIZER,
			useFactory: initializeMapper,
			deps: [MAPPING_PROFILES],
			multi: true,
		});

		return this;
	}
}
