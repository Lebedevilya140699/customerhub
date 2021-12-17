import { AutoMap } from '@nartc/automapper';

export class Certificate {
	@AutoMap()
	public name?: string | null;
	@AutoMap()
	public expirationAt?: Date | null;
}
