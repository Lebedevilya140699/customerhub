import { AutoMap } from '@nartc/automapper';
import { PersonalInfo } from './personal-info';
import { Certificate } from './certificate';
import { Children } from './children';
import { ContactInfo } from './contact-info';
import { Education } from './education';
import { Skills } from './skills';
import { Experience } from './experience';

export class User {
	@AutoMap()
	public certificates?: Certificate[] | null;
	@AutoMap()
	public childrens?: Children[] | null;
	@AutoMap(() => ContactInfo)
	public contactInfo?: ContactInfo | null;
	@AutoMap()
	public education?: Education[] | null;
	@AutoMap()
	public experience?: Experience[] | null;
	@AutoMap()
	public id?: number | null;
	@AutoMap(() => PersonalInfo)
	public personalInfo?: PersonalInfo | null;
	@AutoMap()
	public skills?: Skills[] | null;
	@AutoMap()
	public updatedAt?: Date | null;
}
