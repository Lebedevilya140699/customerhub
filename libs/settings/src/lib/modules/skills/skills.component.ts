import { Component } from '@angular/core';
import { Resume } from '@core/domain';
import { Observable } from 'rxjs';
import { SkillsAddComponent } from './skills-add.component';
import { CurtainService } from '@core/curtain';
import { filterNil } from '@core/common';
import { mergeMap } from 'rxjs/operators';
import { SessionFacade } from '@core/session';
import { ResumeCollectionService } from '@core/user';

@Component({
	selector: 'hh-skills',
	templateUrl: './skills.component.html',
})
export class SkillsComponent {
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
		//this.curtain.open(MainEditComponent);
	}

	triggerAdd(): void {
		this.curtain.open(SkillsAddComponent);
	}
}
