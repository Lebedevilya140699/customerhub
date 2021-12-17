import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Task } from '@core/domain';
import { Observable } from 'rxjs';
import { mapProp, where } from '@core/common';

@Injectable()
export class TasksCollectionService extends EntityCollectionServiceBase<Task> {
	constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
		super('Tasks', serviceElementsFactory);
	}

	public tasks(ids: number[]): Observable<Task[]> {
		return this.entities$.pipe(where((x) => ids.includes(x.id!)));
	}

	public task(id: number): Observable<Task | null> {
		return this.entityMap$.pipe(mapProp((x) => x[id], null));
	}
}
