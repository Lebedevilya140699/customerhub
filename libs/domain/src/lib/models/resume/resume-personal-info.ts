import { AutoMap } from '@nartc/automapper';

export class ResumePersonalInfo {
	@AutoMap()
	public birthDate?: Date | null;
	@AutoMap()
	public firstName?: string | null;
	@AutoMap()
	public lastName?: string | null;
	@AutoMap()
	public fullName?: string | null;
	public position?: string | null;
}
