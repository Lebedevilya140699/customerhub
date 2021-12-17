import { InjectionToken } from '@angular/core';
import { Endpoint } from '../../models/http/endpoint';

export const ENDPOINTS: InjectionToken<Map<string, Endpoint>> = new InjectionToken<
	Map<string, Endpoint>
>('ENDPOINTS');
