import { SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class VisaResponse {
	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'expiration_date',
	})
	@AutoMap()
	public expirationAt?: string | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public name?: string | null;
}
