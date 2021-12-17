import { AutoMap } from '@nartc/automapper';

export class ResumeCertificate {
	@AutoMap()
	public name?: string | null;
	@AutoMap()
	public expirationAt?: Date | null;
}
