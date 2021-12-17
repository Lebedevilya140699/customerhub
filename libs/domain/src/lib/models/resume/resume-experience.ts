import { AutoMap } from '@nartc/automapper';

export class ResumeExperience {
	@AutoMap()
	public customerDomain?: string | null;
	@AutoMap()
	public customerName?: string | null;
	@AutoMap()
	public startedAt?: Date | null;
	@AutoMap()
	public endedAt?: Date | null;
	@AutoMap()
	public duration?: string | null;
	@AutoMap()
	public projectDescription?: string | null;
	@AutoMap()
	public projectName?: string | null;
	@AutoMap()
	public responsibilities?: string | null;
	@AutoMap()
	public role?: string | null;
	@AutoMap()
	public technologies?: string[] | null;
}
