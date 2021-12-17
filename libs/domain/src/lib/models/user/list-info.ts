import { AutoMap } from '@nartc/automapper';

export class ListInfo {
	@AutoMap()
	public limit?: number | null;
	@AutoMap()
	public page?: number | null;
	@AutoMap()
	public count?: number | null;
}
