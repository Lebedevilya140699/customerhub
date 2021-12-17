import { AutoMapper, mapFrom, ProfileBase } from '@nartc/automapper';
import { AuthForm, LoginRequest } from '@core/platform';

export class AuthProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super();
		mapper.createMap(AuthForm, LoginRequest).forMember(
			(x) => x.username,
			mapFrom((x) => x.login)
		);
	}
}
