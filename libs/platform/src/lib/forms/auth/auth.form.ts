import { AutoMap } from '@nartc/automapper';

export class AuthForm {
	@AutoMap()
	public login?: string | null;
	@AutoMap()
	public password?: string | null;
}
