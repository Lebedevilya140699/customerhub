import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Resume, User } from '@core/domain';
import { CurtainService } from '@core/curtain';
import { ExperienceEditComponent } from './experience-edit.component';
import { ExperienceAddComponent } from './experience-add.component';
import { SessionFacade } from '@core/session';
import { ResumeCollectionService } from '@core/user';
import { mergeMap } from 'rxjs/operators';
import { filterNil } from '@core/common';
import { ExperienceFormFacade } from './+state/experience-form.facade';

@Component({
	selector: 'hh-experience',
	templateUrl: './experience.component.html',
})
export class ExperienceComponent {
	public resume$?: Observable<Resume | null>;

	constructor(
		private readonly curtainService: CurtainService,
		private readonly sessionFacade: SessionFacade,
		private readonly experienceFormFacade: ExperienceFormFacade,
		private readonly resumeCollectionService: ResumeCollectionService
	) {
		this.resume$ = this.sessionFacade.userId$.pipe(
			filterNil,
			mergeMap((userId: number | null) => this.resumeCollectionService.resume(userId!)),
			filterNil
		);
	}

	triggerEdit(): void {
		this.curtainService.open(ExperienceEditComponent);
	}

	triggerAdd(): void {
		this.experienceFormFacade.reset();
		this.curtainService.open(ExperienceAddComponent);
	}
}
