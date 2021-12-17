import { AutoMap } from '@nartc/automapper';

export class ResumeEducation {
	@AutoMap()
	public universityName?: string | null;
	@AutoMap()
	public degree?: string | null;
	@AutoMap()
	public specialization?: string | null;
	@AutoMap()
	public startYear?: Date | null;
	@AutoMap()
	public finishYear?: Date | null;
}
