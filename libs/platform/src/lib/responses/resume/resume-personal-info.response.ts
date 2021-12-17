import { AutoMap } from '@nartc/automapper';
import { SerializeObject } from '@core/common';

export class ResumePersonalInfoResponse {
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
