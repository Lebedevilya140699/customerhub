import { AutoMap } from '@nartc/automapper';
import { ResumePersonalInfo } from './resume-personal-info';
import { ResumeContactInfo } from './resume-contact-info';
import { ResumeExperience } from './resume-experience';
import { ResumeCertificate } from './resume-certificate';
import { ResumeEducation } from './resume-education';
import { ResumeSkills } from './resume-skills';

export class Resume {
	@AutoMap()
	public id?: number | null;
	@AutoMap()
	public employeeId?: number | null;
	@AutoMap()
	public isApproved?: boolean | null;
	@AutoMap()
	public approvedAt?: number | null;
	@AutoMap()
	public generatedAt?: number | null;
	@AutoMap()
	public summary?: string[] | null;
	@AutoMap(() => ResumePersonalInfo)
	public personalInfo?: ResumePersonalInfo | null;
	@AutoMap(() => ResumeContactInfo)
	public contactInfo?: ResumeContactInfo | null;
	@AutoMap()
	public experience?: ResumeExperience[] | null;
	@AutoMap()
	public certificates?: ResumeCertificate[] | null;
	@AutoMap()
	public education?: ResumeEducation[] | null;
	@AutoMap()
	public skills?: ResumeSkills[] | null;
}
