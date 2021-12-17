import { AutoMap } from '@nartc/automapper';

export class Children {
	@AutoMap()
	public name?: string | null;
	@AutoMap()
	public birthDate?: Date | null;
}
