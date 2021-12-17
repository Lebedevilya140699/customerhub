import { SerializeArray, SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class SkillsResponse {
	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'skill_type',
	})
	@AutoMap()
	public skillType?: string | null;

	@SerializeArray({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public skills?: string[] | null;
}
