import { AutoMapper, convertUsing, mapFrom, Mapper, mapWith, ProfileBase } from '@nartc/automapper';
import { ResumePersonalInfoResponse, ResumeRequest, ResumeResponse } from '@core/platform';
import {
	Resume,
	ResumeCertificate,
	ResumeContactInfo,
	ResumeEducation,
	ResumeExperience,
	ResumePersonalInfo,
	ResumeSkills,
} from '@core/domain';
import { TimestampDateConverter, UnixDateConverter } from '@core/common';
import {
	ResumeCertificateResponse,
	ResumeContactInfoResponse,
	ResumeEducationResponse,
	ResumeExperienceResponse,
	ResumeSkillsResponse,
} from '../responses';
import {
	ResumeCertificateRequest,
	ResumeContactInfoRequest,
	ResumeEducationRequest,
	ResumeExperienceRequest,
	ResumePersonalInfoRequest,
	ResumeSkillsRequest,
} from '../requests';
import * as moment from 'moment';

export class ResumeProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super();

		mapper
			.createMap(ResumeResponse, Resume)
			.forMember(
				(x) => x.id,
				mapFrom((s) => s.id)
			)
			.forMember(
				(x) => x.employeeId,
				mapFrom((s) => s.employeeId)
			)
			.forMember(
				(x) => x.isApproved,
				mapFrom((x) => x.isApproved)
			)
			.forMember(
				(x) => x.approvedAt,
				mapFrom((x) => x.approvedAt)
			)
			.forMember(
				(x) => x.generatedAt,
				mapFrom((x) => x.generatedAt)
			)
			.forMember(
				(x) => x.summary,
				mapFrom((x) => x.summary)
			)
			.forMember(
				(x) => x.personalInfo,
				mapWith(ResumePersonalInfo, (x) => x.personalInfo)
			)
			.forMember(
				(x) => x.contactInfo,
				mapWith(ResumeContactInfo, (x) => x.contactInfo)
			)
			.forMember(
				(x) => x.experience,
				mapFrom((x) => Mapper.mapArray(x.experience!, ResumeExperience))
			)
			.forMember(
				(x) => x.certificates,
				mapFrom((x) => Mapper.mapArray(x.certificates!, ResumeCertificate))
			)
			.forMember(
				(x) => x.education,
				mapFrom((x) => Mapper.mapArray(x.education!, ResumeEducation))
			)
			.forMember(
				(x) => x.skills,
				mapFrom((x) => Mapper.mapArray(x.skills!, ResumeSkills))
			);

		mapper
			.createMap(Resume, ResumeRequest)
			.forMember(
				(x) => x.id,
				mapFrom((x) => x.id)
			)
			.forMember(
				(x) => x.employeeId,
				mapFrom((x) => x.employeeId)
			)
			.forMember(
				(x) => x.isApproved,
				mapFrom((x) => x.isApproved)
			)
			.forMember(
				(x) => x.approvedAt,
				mapFrom((x) => x.approvedAt)
			)
			.forMember(
				(x) => x.generatedAt,
				mapFrom((x) => x.generatedAt)
			)
			.forMember(
				(x) => x.summary,
				mapFrom((x) => x.summary)
			)
			.forMember(
				(x) => x.personalInfo,
				mapWith(ResumePersonalInfoRequest, (x) => x.personalInfo)
			)
			.forMember(
				(x) => x.contactInfo,
				mapWith(ResumeContactInfoRequest, (x) => x.contactInfo)
			)
			.forMember(
				(x) => x.experience,
				mapFrom((x) => {
					return Array.isArray(x.experience)
						? Mapper.mapArray(x.experience, ResumeExperienceRequest)
						: null;
				})
			)
			.forMember(
				(x) => x.certificates,
				mapFrom((x) => {
					return Array.isArray(x.certificates)
						? Mapper.mapArray(x.certificates, ResumeCertificateRequest)
						: null;
				})
			)
			.forMember(
				(x) => x.education,
				mapFrom((x) => {
					return Array.isArray(x.education)
						? Mapper.mapArray(x.education, ResumeEducationRequest)
						: null;
				})
			)
			.forMember(
				(x) => x.skills,
				mapFrom((x) => {
					return Array.isArray(x.skills)
						? Mapper.mapArray(x.skills, ResumeSkillsRequest)
						: null;
				})
			);

		mapper
			.createMap(ResumePersonalInfoResponse, ResumePersonalInfo)
			.forMember(
				(x) => x.firstName,
				mapFrom((x) => x.firstName)
			)
			.forMember(
				(x) => x.lastName,
				mapFrom((x) => x.lastName)
			)
			.forMember(
				(x) => x.fullName,
				mapFrom((x) => x.firstName + ' ' + x.lastName)
			)
			.forMember(
				(x) => x.birthDate,
				convertUsing(new UnixDateConverter(), (x) => x.birthDate)
			)
			.forMember(
				(x) => x.position,
				mapFrom((x) => x.position)
			);

		mapper.createMap(ResumeContactInfoResponse, ResumeContactInfo);
		mapper
			.createMap(ResumeExperienceResponse, ResumeExperience)
			.forMember(
				(x) => x.startedAt,
				convertUsing(new UnixDateConverter(), (x) => x.startedAt)
			)
			.forMember(
				(x) => x.endedAt,
				convertUsing(new UnixDateConverter(), (x) => x.endedAt)
			)
			.forMember(
				(x) => x.duration,
				mapFrom((x) =>
					x.endedAt
						? moment.duration(x.endedAt - x.startedAt!, 'milliseconds').humanize()
						: 'Until now'
				)
			)
			.forMember(
				(x) => x.technologies,
				mapFrom((x) => x.technologies)
			);
		mapper.createMap(ResumeCertificateResponse, ResumeCertificate).forMember(
			(x) => x.expirationAt,
			convertUsing(new UnixDateConverter(), (x) => x.expirationAt)
		);
		mapper
			.createMap(ResumeEducationResponse, ResumeEducation)
			.forMember(
				(x) => x.startYear,
				convertUsing(new UnixDateConverter(), (x) => x.startYear)
			)
			.forMember(
				(x) => x.finishYear,
				convertUsing(new UnixDateConverter(), (x) => x.finishYear)
			);
		mapper.createMap(ResumeSkillsResponse, ResumeSkills);

		mapper
			.createMap(ResumePersonalInfo, ResumePersonalInfoRequest)
			.forMember(
				(x) => x.firstName,
				mapFrom((x) => x.firstName)
			)
			.forMember(
				(x) => x.lastName,
				mapFrom((x) => x.lastName)
			)
			.forMember(
				(x) => x.birthDate,
				convertUsing(new TimestampDateConverter(), (x) => x.birthDate)
			)
			.forMember(
				(x) => x.position,
				mapFrom((x) => x.position)
			);

		mapper.createMap(ResumeContactInfo, ResumeContactInfoRequest);
		mapper
			.createMap(ResumeExperience, ResumeExperienceRequest)
			.forMember(
				(x) => x.startedAt,
				convertUsing(new TimestampDateConverter(), (x) => x.startedAt)
			)
			.forMember(
				(x) => x.endedAt,
				convertUsing(new TimestampDateConverter(), (x) => x.endedAt)
			);
		mapper.createMap(ResumeCertificate, ResumeCertificateRequest).forMember(
			(x) => x.expirationAt,
			convertUsing(new TimestampDateConverter(), (x) => x.expirationAt)
		);
		mapper
			.createMap(ResumeEducation, ResumeEducationRequest)
			.forMember(
				(x) => x.startYear,
				convertUsing(new TimestampDateConverter(), (x) => x.startYear)
			)
			.forMember(
				(x) => x.finishYear,
				convertUsing(new TimestampDateConverter(), (x) => x.finishYear)
			);
		mapper.createMap(ResumeSkills, ResumeSkillsRequest);
	}
}
