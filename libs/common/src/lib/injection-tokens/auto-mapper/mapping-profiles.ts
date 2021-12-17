import { InjectionToken } from '@angular/core';
import { AutoMapper, MappingProfile } from '@nartc/automapper';

export const MAPPING_PROFILES: InjectionToken<
	(new (mapper: AutoMapper) => MappingProfile)[]
> = new InjectionToken<(new (mapper: AutoMapper) => MappingProfile)[]>('MAPPING_PROFILES');
