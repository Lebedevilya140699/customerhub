import { AutoMapper, Mapper, MappingProfile } from '@nartc/automapper';

export function initializeMapper(
	profiles: (new (mapper: AutoMapper) => MappingProfile)[]
): () => void {
	return () =>
		profiles.forEach((profile: new (mapper: AutoMapper) => MappingProfile) => {
			Mapper.addProfile(profile);
		});
}
