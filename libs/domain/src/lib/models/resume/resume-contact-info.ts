import { AutoMap } from '@nartc/automapper';

export class ResumeContactInfo {
	@AutoMap()
	public phone?: string | null;
	@AutoMap()
	public email?: string | null;
	@AutoMap()
	public links?: string[] | null;
}
