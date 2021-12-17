import { AutoMapper, convertUsing, ignore, mapFrom, mapWith, ProfileBase } from '@nartc/automapper';
import { Resume, ResumeContactInfo, ResumePersonalInfo } from '@core/domain';
import { ContactsForm, ResumeForm } from '@core/platform';
import { unbox } from 'ngrx-forms';
import { ISOStringDateConverter } from '@core/common';

export class ContactsFormProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super();

		mapper
			.createMap(Resume, ContactsForm)
			.forMember(
				(x) => x.phone,
				mapFrom((x) => x.contactInfo?.phone)
			)
			.forMember(
				(x) => x.email,
				mapFrom((x) => x.contactInfo?.email)
			);

		mapper
			.createMap(ContactsForm, Resume)
			.forMember((x) => x.id, ignore())
			.forMember((x) => x.employeeId, ignore())
			.forMember((x) => x.isApproved, ignore())
			.forMember((x) => x.approvedAt, ignore())
			.forMember((x) => x.generatedAt, ignore())
			.forMember((x) => x.summary, ignore())
			.forMember((x) => x.personalInfo, ignore())
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
			.createMap(ContactsForm, ResumeContactInfo)
			.forMember((x) => x.links, ignore())
			.forMember(
				(x) => x.phone,
				mapFrom((x) => x.phone)
			)
			.forMember(
				(x) => x.email,
				mapFrom((x) => x.email)
			);
	}
}
