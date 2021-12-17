import { AutoMap } from '@nartc/automapper';

export class LinksForm {
	@AutoMap()
	public link?: string | null;
}
