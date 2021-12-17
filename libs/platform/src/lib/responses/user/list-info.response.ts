import { SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class ListInfoResponse {
	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public limit?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public page?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public count?: number | null;
}
