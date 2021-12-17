import { SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class ManagerResponse {
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
	public id?: number | null;
}
