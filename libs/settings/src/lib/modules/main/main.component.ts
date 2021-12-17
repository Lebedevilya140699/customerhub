import { Component } from '@angular/core';
import { Resume } from '@core/domain';
import { Observable } from 'rxjs';
import { SessionFacade } from '@core/session';
import { ResumeCollectionService } from '@core/user';
import { mergeMap } from 'rxjs/operators';
import { filterNil } from '@core/common';

@Component({
	selector: 'hh-main',
	templateUrl: './main.component.html',
})
export class MainComponent {
	public readonly resume$: Observable<Resume>;
	constructor(
		private readonly session: SessionFacade,
		private readonly resumeCollectionService: ResumeCollectionService
	) {
		this.resume$ = this.session.userId$.pipe(
			filterNil,
			mergeMap((userId: number | null) => this.resumeCollectionService.resume(userId!)),
			filterNil
		);
	}
}
