import { SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class ResumeEducationResponse {
	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'university_name',
	})
	@AutoMap()
	public universityName?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public degree?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public specialization?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'start_year',
	})
	@AutoMap()
	public startYear?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'finish_year',
	})
	@AutoMap()
	public finishYear?: number | null;
}
