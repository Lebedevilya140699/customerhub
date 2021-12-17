import { Injectable } from '@angular/core';
import { Endpoint } from '@core/common';
import { EndpointNotSupportedException } from '@core/domain';

@Injectable()
export class EndpointManagerService {
	private readonly endpoints: Map<string, Endpoint>;

	constructor() {
		this.endpoints = new Map<string, Endpoint>();
	}

	public registerEndpoints(endpoints: Map<string, Endpoint>): void {
		endpoints.forEach((value: Endpoint, key: string) => {
			this.endpoints.set(key, value);
		});
	}

	public get(key: string): Endpoint {
		if (!this.endpoints.has(key)) {
			throw new EndpointNotSupportedException(key);
		}
		return this.endpoints.get(key)!;
	}
}
