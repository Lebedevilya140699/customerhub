import { AutoMapper, convertUsing, mapFrom, ProfileBase } from '@nartc/automapper';
import { CertificateForm } from '@core/platform';
import { Certificate, Resume, ResumeCertificate } from '@core/domain';
import { ISOStringDateConverter } from '@core/common';

export class CertificateFormProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super();

		mapper.createMap(CertificateForm, ResumeCertificate).forMember(
			(x) => x.expirationAt,
			convertUsing(new ISOStringDateConverter(), (x) => x.expirationAt)
		);

		mapper
			.createMap(ResumeCertificate, CertificateForm)
			.forMember(
				(x) => x.name,
				mapFrom((x) => x.name)
			)
			.forMember(
				(x) => x.expirationAt,
				mapFrom((x) => (x.expirationAt ? x.expirationAt.toISOString() : ''))
			);
	}
}
