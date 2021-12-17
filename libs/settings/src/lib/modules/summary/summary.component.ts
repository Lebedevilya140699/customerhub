import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Resume } from '@core/domain';
import { CurtainService } from '@core/curtain';
import { SummaryEditComponent } from './summary-edit.component';
import { SessionFacade } from '@core/session';
import { ResumeCollectionService } from '@core/user';
import { filterNil } from '@core/common';
import { mergeMap } from 'rxjs/operators';

@Component({
	selector: 'hh-summary',
	templateUrl: './summary.component.html',
})
export class SummaryComponent {
	public resume$?: Observable<Resume>;

	constructor(
		private readonly curtain: CurtainService,
		private readonly sessionFacade: SessionFacade,
		private readonly resumeCollectionService: ResumeCollectionService
	) {
		this.resume$ = this.sessionFacade.userId$.pipe(
			filterNil,
			mergeMap((userId: number | null) => this.resumeCollectionService.resume(userId!)),
			filterNil
		);
	}

	triggerEdit(): void {
		this.curtain.open(SummaryEditComponent);
	}
}
