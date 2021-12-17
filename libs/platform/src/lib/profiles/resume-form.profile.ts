import { AutoMapper, convertUsing, ignore, mapFrom, mapWith, ProfileBase } from '@nartc/automapper';
import { Resume, ResumePersonalInfo } from '@core/domain';
import { ResumeForm } from '../forms';
import { box, unbox } from 'ngrx-forms';
import { ISOStringDateConverter } from '@core/common';
import { ResumeContactInfo } from '@core/domain';

export class ResumeFormProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super();
		mapper
			.createMap(Resume, ResumeForm)
			.forMember(
				(x) => x.firstName,
				mapFrom((x) => x.personalInfo!.firstName)
			)
			.forMember(
				(x) => x.lastName,
				mapFrom((x) => x.personalInfo!.lastName)
			)
			.forMember(
				(x) => x.birthDate,
				mapFrom((x) =>
					x.personalInfo!.birthDate ? x.personalInfo!.birthDate.toISOString() : ''
				)
			)
			.forMember(
				(x) => x.position,
				mapFrom((x) => x.personalInfo!.position)
			)
			.forMember(
				(x) => x.phone,
				mapFrom((x) => x.contactInfo!.phone)
			)
			.forMember(
				(x) => x.email,
				mapFrom((x) => x.contactInfo!.email)
			)
			.forMember(
				(x) => x.links,
				mapFrom((x) => box(x.contactInfo!.links || []))
			)
			.forMember(
				(x) => x.client,
				mapFrom((x) => x.experience![0].customerName || '')
			)
			.forMember(
				(x) => x.role,
				mapFrom((x) => x.experience![0].role || '')
			)
			.forMember(
				(x) => x.startedAt,
				mapFrom((x) =>
					x.experience![0].startedAt ? x.experience![0].startedAt.toISOString() : ''
				)
			)
			.forMember(
				(x) => x.endedAt,
				mapFrom((x) =>
					x.experience![0].endedAt ? x.experience![0].endedAt!.toISOString() : ''
				)
			)
			.forMember(
				(x) => x.description,
				mapFrom((x) => x.experience![0].projectDescription || '')
			)
			.forMember(
				(x) => x.responsibilities,
				mapFrom((x) => x.experience![0].responsibilities || '')
			)
			.forMember(
				(x) => x.summary,
				mapFrom((x) => box(x.summary))
			);

		mapper
			.createMap(ResumeForm, Resume)
			.forMember((x) => x.id, ignore())
			.forMember((x) => x.employeeId, ignore())
			.forMember((x) => x.isApproved, ignore())
			.forMember((x) => x.approvedAt, ignore())
			.forMember((x) => x.generatedAt, ignore())
			.forMember(
				(x) => x.summary,
				mapFrom((x) => unbox(x.summary))
			)
			.forMember(
				(x) => x.personalInfo,
				mapWith(
					ResumePersonalInfo,
					(x) => x,
					() => ResumeForm
				)
			)
			.forMember(
				(x) => x.contactInfo,
				mapWith(
					ResumeContactInfo,
					(x) => x,
					() => ResumeForm
				)
			)
			.forMember((x) => x.experience, ignore())
			.forMember((x) => x.certificates, ignore())
			.forMember((x) => x.education, ignore())
			.forMember((x) => x.skills, ignore());

		mapper
			.createMap(ResumeForm, ResumePersonalInfo)
			.forMember((x) => x.fullName, ignore())
			.forMember(
				(x) => x.firstName,
				mapFrom((x) => x.firstName)
			)
			.forMember(
				(x) => x.lastName,
				mapFrom((x) => x.lastName)
			)
			.forMember(
				(x) => x.position,
				mapFrom((x) => x.position)
			)
			.forMember(
				(x) => x.birthDate,
				convertUsing(new ISOStringDateConverter(), (x) => x.birthDate)
			);

		mapper.createMap(ResumeForm, ResumeContactInfo).forMember(
			(x) => x.links,
			mapFrom((x) => {
				let unboxed = unbox(x.links);

				if (Array.isArray(unboxed)) {
					return unboxed.length > 0 ? unboxed : null;
				}

				return null;
			})
		);
	}
}
