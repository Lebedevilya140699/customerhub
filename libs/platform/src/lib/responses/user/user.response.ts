import { AutoMap } from '@nartc/automapper';
import { SerializeArray, SerializeObject, SerializeType } from '@core/common';
import { PersonalInfoResponse } from './personal-info.response';
import { ContactInfoResponse } from './contact-info.response';
import { EducationResponse } from './education.response';
import { ExperienceResponse } from './experience.response';
import { SkillsResponse } from './skills.response';
import { ChildrenResponse } from './children.response';
import { CertificateResponse } from './certificate.response';

export class UserResponse {
	@SerializeArray(CertificateResponse, {
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public certificates?: CertificateResponse[] | null;

	@SerializeArray(ChildrenResponse, {
		nullable: true,
		optional: true,
		name: 'children',
	})
	@AutoMap()
	public childrens?: ChildrenResponse[] | null;

	@SerializeType(ContactInfoResponse, {
		name: 'contact_info',
		nullable: true,
		optional: true,
	})
	@AutoMap(() => ContactInfoResponse)
	public contactInfo?: ContactInfoResponse | null;

	@SerializeArray(EducationResponse, {
		name: 'educations',
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public education?: EducationResponse[] | null;

	@SerializeArray(ExperienceResponse, {
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public experience?: ExperienceResponse[] | null;

	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public id?: number | null;

	@SerializeType(PersonalInfoResponse, {
		name: 'personal_info',
		nullable: true,
		optional: true,
	})
	@AutoMap(() => PersonalInfoResponse)
	public personalInfo?: PersonalInfoResponse | null;

	@SerializeArray(SkillsResponse, {
		name: 'skill_group',
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public skills?: SkillsResponse[] | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'updated_at',
	})
	@AutoMap()
	public updatedAt?: number | null;
}
