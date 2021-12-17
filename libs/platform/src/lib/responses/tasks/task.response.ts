import { SerializeObject, SerializeType } from '@core/common';
import { AutoMap } from '@nartc/automapper';
import { ReporterResponse } from './reporter.response';

export class TaskResponse {
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
	public title?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public type?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public comment?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public tags?: string[] | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public createdAt?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public updatedAt?: number | null;

	@SerializeType(ReporterResponse, {
		nullable: true,
		optional: true,
	})
	@AutoMap(() => ReporterResponse)
	public reporter?: ReporterResponse | null;
}
