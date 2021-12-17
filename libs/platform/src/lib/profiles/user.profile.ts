import { AutoMapper, convertUsing, mapFrom, Mapper, mapWith, ProfileBase } from '@nartc/automapper';
import {
	Certificate,
	Children,
	ContactInfo,
	Education,
	Experience,
	ListInfo,
	Location,
	Manager,
	PersonalInfo,
	Skills,
	User,
	Users,
	Visa,
} from '@core/domain';
import {
	CertificateResponse,
	ChildrenResponse,
	ContactInfoResponse,
	EducationResponse,
	ExperienceResponse,
	ListInfoResponse,
	LocationResponse,
	ManagerResponse,
	PersonalInfoResponse,
	SkillsResponse,
	UserResponse,
	UsersResponse,
	VisaResponse,
} from '../responses';
import { UnixDateConverter } from '@core/common';
import * as moment from 'moment';

export class UserProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super();
		mapper
			.createMap(UserResponse, User)
			.forMember(
				(x) => x.id,
				mapFrom((s) => s.id)
			)
			.forMember(
				(x) => x.updatedAt,
				convertUsing(new UnixDateConverter(), (x) => x.updatedAt)
			)
			.forMember(
				(x) => x.personalInfo,
				mapWith(PersonalInfo, (x) => x.personalInfo)
			)
			.forMember(
				(x) => x.contactInfo,
				mapWith(ContactInfo, (x) => x.contactInfo)
			)
			.forMember(
				(x) => x.skills,
				mapFrom((x) => Mapper.mapArray(x.skills!, Skills))
			)
			.forMember(
				(x) => x.certificates,
				mapFrom((x) => Mapper.mapArray(x.certificates!, Certificate))
			)
			.forMember(
				(x) => x.childrens,
				mapFrom((x) => Mapper.mapArray(x.childrens!, Children))
			)
			.forMember(
				(x) => x.education,
				mapFrom((x) => Mapper.mapArray(x.education!, Education))
			)
			.forMember(
				(x) => x.experience,
				mapFrom((x) => Mapper.mapArray(x.experience!, Experience))
			);

		mapper
			.createMap(PersonalInfoResponse, PersonalInfo)
			.forMember(
				(x) => x.fullName,
				mapFrom((x) => x.firstName + ' ' + x.lastName)
			)
			.forMember(
				(x) => x.birthDate,
				convertUsing(new UnixDateConverter(), (x) => x.birthDate)
			)
			.forMember(
				(x) => x.birthDateUTC,
				mapFrom((x) => x.birthDate! * 1000)
			)
			.forMember(
				(x) => x.visas,
				mapFrom((x) => Mapper.mapArray(x.visas!, Visa))
			)
			.forMember(
				(x) => x.location,
				mapWith(Location, (x) => x.location)
			)
			.forMember(
				(x) => x.summary,
				mapFrom((x) => x.summary)
			);

		mapper.createMap(LocationResponse, Location);
		mapper
			.createMap(EducationResponse, Education)
			.forMember(
				(x) => x.startYear,
				convertUsing(new UnixDateConverter(), (x) => x.startYear)
			)
			.forMember(
				(x) => x.finishYear,
				convertUsing(new UnixDateConverter(), (x) => x.finishYear)
			);
		mapper.createMap(ContactInfoResponse, ContactInfo);
		mapper.createMap(VisaResponse, Visa);
		mapper
			.createMap(ChildrenResponse, Children)
			.forMember(
				(x) => x.name,
				mapFrom((x) => x.name)
			)
			.forMember(
				(x) => x.birthDate,
				convertUsing(new UnixDateConverter(), (x) => x.birthDate)
			);

		mapper
			.createMap(UsersResponse, Users)
			.forMember(
				(x) => x.listInfo,
				mapWith(ListInfo, (x) => x.listInfo)
			)
			.forMember(
				(x) => x.items,
				mapFrom((x) => Mapper.mapArray(x.items!, User))
			);

		mapper.createMap(ListInfoResponse, ListInfo);
		mapper
			.createMap(SkillsResponse, Skills)
			.forMember(
				(x) => x.skillType,
				mapFrom((x) => x.skillType)
			)
			.forMember(
				(x) => x.skills,
				mapFrom((x) => x.skills)
			);
		mapper.createMap(CertificateResponse, Certificate).forMember(
			(x) => x.expirationAt,
			convertUsing(new UnixDateConverter(), (x) => x.expirationAt)
		);
		mapper
			.createMap(ExperienceResponse, Experience)
			.forMember(
				(x) => x.diff,
				mapFrom((x) =>
					x.endedAt
						? moment.duration(x.endedAt - x.startedAt!, 'second').humanize()
						: 'Until now'
				)
			)
			.forMember(
				(x) => x.startedAt,
				convertUsing(new UnixDateConverter(), (x) => x.startedAt)
			)
			.forMember(
				(x) => x.endedAt,
				convertUsing(new UnixDateConverter(), (x) => x.endedAt)
			);
		mapper.createMap(ManagerResponse, Manager);
	}
}
