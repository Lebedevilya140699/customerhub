import { AutoMap } from '@nartc/automapper';
import { SerializeObject } from '@core/common';

export class LoginRequest {
	@SerializeObject({
		name: 'username',
		optional: true,
		nullable: true,
	})
	@AutoMap()
	public username?: string;

	@SerializeObject({
		name: 'password',
		optional: true,
		nullable: true,
	})
	@AutoMap()
	public password?: string;
}
