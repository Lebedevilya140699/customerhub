import { InjectionToken } from '@angular/core';
import { NavigationItem } from '../interfaces/navigation';

export const NAVIGATION: InjectionToken<NavigationItem[]> = new InjectionToken<NavigationItem[]>(
	'@site-core/layout/NAVIGATION'
);
