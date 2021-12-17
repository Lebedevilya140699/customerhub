import { SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class ResumePersonalInfoRequest {
	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'birth_date',
	})
	@AutoMap()
	public birthDate?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'first_name',
	})
	@AutoMap()
	public firstName?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'last_name',
	})
	@AutoMap()
	public lastName?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public position?: string | null;
}
