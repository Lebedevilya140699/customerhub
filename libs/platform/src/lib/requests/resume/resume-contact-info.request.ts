import { SerializeArray, SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class ResumeContactInfoRequest {
	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public email?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public phone?: string | null;

	@SerializeArray({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public links?: string[] | null;
}
