import { Boxed } from 'ngrx-forms';
import { AutoMap } from '@nartc/automapper';

export class ResumeForm {
	@AutoMap()
	public firstName?: string | null;
	@AutoMap()
	public lastName?: string | null;
	@AutoMap()
	public birthDate?: string | null;
	@AutoMap()
	public position?: string | null;
	@AutoMap()
	public phone?: string | null;
	@AutoMap()
	public email?: string | null;
	@AutoMap()
	public links?: Boxed<string[]> | null;
	public client?: string | null;
	public role?: string | null;
	public startedAt?: string | null;
	public endedAt?: string | null;
	public description?: string | null;
	public responsibilities?: string | null;
	public summary?: Boxed<string[]> | null;
}
