import { AutoMap } from '@nartc/automapper';
import { SerializeArray, SerializeObject, SerializeType } from '@core/common';
import { ResumePersonalInfoResponse } from './resume-personal-info.response';
import { ResumeContactInfoResponse } from './resume-contact-info.response';
import { ResumeExperienceResponse } from './resume-experience.response';
import { ResumeCertificateResponse } from './resume-certificate.response';
import { ResumeEducationResponse } from './resume-education.response';
import { ResumeSkillsResponse } from './resume-skills.response';

export class ResumeResponse {
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

	@SerializeType(ResumePersonalInfoResponse, {
		name: 'personal_info',
		nullable: true,
		optional: true,
	})
	@AutoMap(() => ResumePersonalInfoResponse)
	public personalInfo?: ResumePersonalInfoResponse | null;

	@SerializeType(ResumeContactInfoResponse, {
		name: 'contact_info',
		nullable: true,
		optional: true,
	})
	@AutoMap(() => ResumeContactInfoResponse)
	public contactInfo?: ResumeContactInfoResponse | null;

	@SerializeArray(ResumeExperienceResponse, {
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public experience?: ResumeExperienceResponse[] | null;

	@SerializeArray(ResumeCertificateResponse, {
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public certificates?: ResumeCertificateResponse[] | null;

	@SerializeArray(ResumeEducationResponse, {
		name: 'educations',
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public education?: ResumeEducationResponse[] | null;

	@SerializeArray(ResumeSkillsResponse, {
		name: 'skill_group',
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public skills?: ResumeSkillsResponse[] | null;
}
