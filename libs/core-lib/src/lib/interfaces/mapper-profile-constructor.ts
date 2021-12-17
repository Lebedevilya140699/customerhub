import { AutoMapper } from '@nartc/automapper';
import { MappingProfile } from '@nartc/automapper/dist/types';

export interface MapperProfileConstructor {
	new (mapper: AutoMapper): MappingProfile;
}
