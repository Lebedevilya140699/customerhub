import { SerializeObject } from '@core/common';

export class LoginResponse {
	@SerializeObject({
		name: 'token',
		optional: true,
		nullable: true,
	})
	public token?: string;
}
