import { AutoMap } from '@nartc/automapper';

export class Location {
	@AutoMap()
	public country?: string | null;
	@AutoMap()
	public city?: string | null;
}
