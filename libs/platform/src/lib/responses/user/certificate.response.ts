import { SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class CertificateResponse {
	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'expiration_date',
	})
	@AutoMap()
	public expirationAt?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public name?: string | null;
}
