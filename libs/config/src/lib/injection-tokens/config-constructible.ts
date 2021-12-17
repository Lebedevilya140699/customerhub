import { InjectionToken } from '@angular/core';
import { Constructor } from 'serialazy/lib/dist/types';

export const CONFIG_CONSTRUCTABLE: InjectionToken<Constructor<any>> = new InjectionToken<
	Constructor<any>
>('CONFIG_CONSTRUCTABLE');
