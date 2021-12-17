import { AutoMap } from '@nartc/automapper';

export class Manager {
	@AutoMap()
	public id?: number | null;
	@AutoMap()
	public firstName?: string | null;
	@AutoMap()
	public lastName?: string | null;
}
