import { InjectionToken } from '@angular/core';
import { CurtainConfig } from '../models';

export const CURTAIN_CONFIG: InjectionToken<CurtainConfig> = new InjectionToken<CurtainConfig>(
	'CURTAIN_CONFIG'
);

export const _CURTAIN_CONFIG: InjectionToken<CurtainConfig> = new InjectionToken<CurtainConfig>(
	'PRIVATE_CURTAIN_CONFIG'
);
