import { AutoMap } from '@nartc/automapper';

export class ContactsForm {
	@AutoMap()
	public phone?: string | null;
	@AutoMap()
	public email?: string | null;
}
