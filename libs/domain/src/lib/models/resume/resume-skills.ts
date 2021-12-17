import { AutoMap } from '@nartc/automapper';

export class ResumeSkills {
	@AutoMap()
	public skillType?: string | null;
	@AutoMap()
	public skills?: string[] | null;
}
