import { InjectionToken } from '@angular/core';
import { CoreLibModuleBuilder } from '../models/core-lib-module-builder';

export const CORE_BUILDER: InjectionToken<
	(builder: CoreLibModuleBuilder) => void
> = new InjectionToken<(builder: CoreLibModuleBuilder) => void>('CORE_BUILDER');
