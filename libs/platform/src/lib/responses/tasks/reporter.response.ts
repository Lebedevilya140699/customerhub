import { SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class ReporterResponse {
	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public id?: number | null;
	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public firstName?: string | null;
	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public lastName?: string | null;
}
