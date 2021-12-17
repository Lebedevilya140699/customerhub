import { AutoMap } from '@nartc/automapper';

export class Education {
	@AutoMap()
	public degree?: string | null;
	@AutoMap()
	public finishYear?: Date | null;
	@AutoMap()
	public universityName?: string | null;
	@AutoMap()
	public specialization?: string | null;
	@AutoMap()
	public startYear?: Date | null;
}
