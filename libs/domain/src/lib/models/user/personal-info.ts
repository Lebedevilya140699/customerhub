import { AutoMap } from '@nartc/automapper';
import { Location } from './location';
import { Visa } from './visa';
import { Manager } from './manager';

export class PersonalInfo {
	@AutoMap()
	public activityStatus?: string | null;
	@AutoMap()
	public birthDate?: Date | null;
	@AutoMap()
	public birthDateUTC?: number | null;
	@AutoMap()
	public firstName?: string | null;
	@AutoMap()
	public lastName?: string | null;
	@AutoMap()
	public fullName?: string | null;
	@AutoMap(() => Location)
	public location?: Location | null;
	@AutoMap(() => Manager)
	public manager?: Manager | null;
	@AutoMap()
	public photo?: string | null;
	@AutoMap()
	public position?: string | null;
	@AutoMap()
	public summary?: string[] | null;
	@AutoMap()
	public role?: string | null;
	@AutoMap(() => Visa)
	public visas?: Visa[] | null;
}
