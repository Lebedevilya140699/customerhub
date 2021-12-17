import { AutoMap } from '@nartc/automapper';
import { SerializeArray, SerializeObject, SerializeType } from '@core/common';
import { LocationResponse } from './location.response';
import { VisaResponse } from './visa.response';
import { ManagerResponse } from './manager.response';

export class PersonalInfoResponse {
	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'activity_status',
	})
	@AutoMap()
	public activityStatus?: string | null;

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

	@SerializeType(LocationResponse, {
		nullable: true,
		optional: true,
	})
	@AutoMap(() => LocationResponse)
	public location?: LocationResponse | null;

	@SerializeType(ManagerResponse, {
		nullable: true,
		optional: true,
	})
	@AutoMap(() => ManagerResponse)
	public manager?: ManagerResponse | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public photo?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public position?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'professional_summary',
	})
	@AutoMap()
	public summary?: string[] | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public role?: string | null;

	@SerializeArray(VisaResponse, {
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public visas?: VisaResponse[] | null;
}
