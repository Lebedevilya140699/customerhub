import { InjectionToken } from '@angular/core';

/**
 * Endpoint filter necessary for interceptors
 * Some interceptors use values that are not accessible on application start
 * Sometimes APP_INITIALIZERS need to make an http request
 */
export interface EndpointFilter {
	readonly reason: string;
	readonly endpointPattern: RegExp;
}

export const ENDPOINT_FILTERS: InjectionToken<EndpointFilter[]> = new InjectionToken<
	EndpointFilter[]
>('ENDPOINT_FILTERS');
