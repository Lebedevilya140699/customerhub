import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Resume, User } from '@core/domain';
import { Observable } from 'rxjs';
import { mapProp, where } from '@core/common';
import { Injectable } from '@angular/core';

@Injectable()
export class ResumeCollectionService extends EntityCollectionServiceBase<Resume> {
	constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
		super('Resume', serviceElementsFactory);
	}

	public resumes(ids: number[]): Observable<Resume[]> {
		return this.entities$.pipe(where((x) => ids.includes(x.id!)));
	}

	public resume(id: number): Observable<Resume | null> {
		return this.entityMap$.pipe(mapProp((x) => x[id], null));
	}
}
