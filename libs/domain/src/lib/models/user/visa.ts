import { AutoMap } from '@nartc/automapper';

export class Visa {
	@AutoMap()
	public name?: string | null;
	@AutoMap()
	public expirationAt?: Date | null;
}
