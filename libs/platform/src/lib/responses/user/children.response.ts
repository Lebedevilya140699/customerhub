import { SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class ChildrenResponse {
	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public name?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'birth_date',
	})
	@AutoMap()
	public birthDate?: number | null;
}
