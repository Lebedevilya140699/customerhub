import { SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class LocationResponse {
	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public country?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public city?: string | null;
}
