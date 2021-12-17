import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '@core/domain';
import { Observable } from 'rxjs';
import { mapProp, where } from '@core/common';
import { Injectable } from '@angular/core';

@Injectable()
export class UserCollectionService extends EntityCollectionServiceBase<User> {
	constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
		super('User', serviceElementsFactory);
	}

	public users(ids: number[]): Observable<User[]> {
		return this.entities$.pipe(where((x) => ids.includes(x.id!)));
	}

	public user(id: number): Observable<User | null> {
		return this.entityMap$.pipe(mapProp((x) => x[id], null));
	}
}
