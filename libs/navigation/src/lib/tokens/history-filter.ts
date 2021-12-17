import { InjectionToken } from '@angular/core';

export const HISTORY_FILTER: InjectionToken<RegExp | null> = new InjectionToken<RegExp | null>(
	'@site-core/navigation/HISTORY_FILTER'
);
