import { SerializeArray, SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class ExperienceResponse {
	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'customer_domain',
	})
	@AutoMap()
	public customerDomain?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'customer_name',
	})
	@AutoMap()
	public customerName?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'started_at',
	})
	@AutoMap()
	public startedAt?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'ended_at',
	})
	@AutoMap()
	public endedAt?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'project_description',
	})
	@AutoMap()
	public projectDescription?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'project_name',
	})
	@AutoMap()
	public projectName?: string | null;

	@SerializeArray({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public responsibilities?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public role?: string | null;

	@SerializeArray({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public technologies?: string[] | null;
}
