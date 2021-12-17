import { Component } from '@angular/core';
import { Resume } from '@core/domain';
import { Observable } from 'rxjs';
import { CertificatesAddComponent } from './certificates-add.component';
import { CurtainService } from '@core/curtain';
import { SessionFacade } from '@core/session';
import { filterNil } from '@core/common';
import { mergeMap } from 'rxjs/operators';
import { ResumeCollectionService } from '@core/user';
import { CertificateFormFacade } from './+state/certificates-form.facade';
import { CertificatesEditComponent } from './certificates-edit.component';

@Component({
	selector: 'hh-certificates',
	templateUrl: './certificates.component.html',
})
export class CertificatesComponent {
	public readonly resume$: Observable<Resume>;

	constructor(
		private readonly curtain: CurtainService,
		private readonly certificateFormFacade: CertificateFormFacade,
		private readonly sessionFacade: SessionFacade,
		private readonly resumeCollectionService: ResumeCollectionService
	) {
		this.resume$ = this.sessionFacade.userId$.pipe(
			filterNil,
			mergeMap((userId: number | null) => this.resumeCollectionService.resume(userId!)),
			filterNil
		);
	}

	public deleteCertificate(index: number) {
		this.certificateFormFacade.deleteCertificate(index);
	}

	triggerEdit(index: number): void {
		this.curtain.open(CertificatesEditComponent, index);
	}

	triggerAdd(): void {
		this.certificateFormFacade.reset();
		this.curtain.open(CertificatesAddComponent);
	}
}
