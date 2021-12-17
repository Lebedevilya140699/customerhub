import { SerializeArray, SerializeObject, SerializeType } from '@core/common';
import { AutoMap } from '@nartc/automapper';
import { ResumePersonalInfoRequest } from './resume-personal-info.request';
import { ResumeContactInfoRequest } from './resume-contact-info.request';
import { ResumeExperienceRequest } from './resume-experience.request';
import { ResumeCertificateRequest } from './resume-certificate.request';
import { ResumeEducationRequest } from './resume-education.request';
import { ResumeSkillsRequest } from './resume-skills.request';

export class ResumeRequest {
	@SerializeObject({
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public id?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'employee_id',
	})
	@AutoMap()
	public employeeId?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'is_approved',
	})
	@AutoMap()
	public isApproved?: boolean | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'approved_at',
	})
	@AutoMap()
	public approvedAt?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'generated_at',
	})
	@AutoMap()
	public generatedAt?: number | null;

	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'professional_summary',
	})
	@AutoMap()
	public summary?: string[] | null;

	@SerializeType(ResumePersonalInfoRequest, {
		name: 'personal_info',
		nullable: true,
		optional: true,
	})
	@AutoMap(() => ResumePersonalInfoRequest)
	public personalInfo?: ResumePersonalInfoRequest | null;

	@SerializeType(ResumeContactInfoRequest, {
		name: 'contact_info',
		nullable: true,
		optional: true,
	})
	@AutoMap(() => ResumeContactInfoRequest)
	public contactInfo?: ResumeContactInfoRequest | null;

	@SerializeArray(ResumeExperienceRequest, {
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public experience?: ResumeExperienceRequest[] | null;

	@SerializeArray(ResumeCertificateRequest, {
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public certificates?: ResumeCertificateRequest[] | null;

	@SerializeArray(ResumeEducationRequest, {
		name: 'educations',
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public education?: ResumeEducationRequest[] | null;

	@SerializeArray(ResumeSkillsRequest, {
		name: 'skill_group',
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public skills?: ResumeSkillsRequest[] | null;
}
