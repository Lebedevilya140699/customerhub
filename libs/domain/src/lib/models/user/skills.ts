import { AutoMap } from '@nartc/automapper';

export class Skills {
	@AutoMap()
	public skillType?: string | null;
	@AutoMap()
	public skills?: string[] | null;
}
