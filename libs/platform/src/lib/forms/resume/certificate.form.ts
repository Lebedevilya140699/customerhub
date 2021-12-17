import { AutoMap } from '@nartc/automapper';

export class CertificateForm {
	@AutoMap()
	public name?: string | null;
	@AutoMap()
	public expirationAt?: string | null;
}
