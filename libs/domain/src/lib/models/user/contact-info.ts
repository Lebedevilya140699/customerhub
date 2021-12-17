import { AutoMap } from '@nartc/automapper';

export class ContactInfo {
	@AutoMap()
	public phone?: string | null;
	@AutoMap()
	public email?: string | null;
	@AutoMap()
	public links?: string[] | null;
}
