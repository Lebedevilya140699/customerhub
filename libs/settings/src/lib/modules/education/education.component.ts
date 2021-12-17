import { Component } from '@angular/core';
import { Resume } from '@core/domain';
import { Observable } from 'rxjs';
import { filterNil } from '@core/common';
import { mergeMap } from 'rxjs/operators';
import { SessionFacade } from '@core/session';
import { ResumeCollectionService } from '@core/user';

@Component({
	selector: 'hh-education',
	templateUrl: './education.component.html',
})
export class EducationComponent {
	public resume$?: Observable<Resume>;
	public isEditMode = false;

	constructor(
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
		//this.curtain.open(MainEditComponent);
	}
}
