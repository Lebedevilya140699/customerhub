import { InjectionToken, Type } from '@angular/core';
import { EntityCollectionServiceBase } from '@ngrx/data';
import { Observable } from 'rxjs';
import { SessionFacade } from '../+state/session.facade';

export const IS_AUTHORIZED: InjectionToken<Observable<boolean>> = new InjectionToken<
	Observable<boolean>
>('@site-core/session/IS_AUTHORIZED');

export function _IS_AUTHORIZED(sessionFacade: SessionFacade): Observable<boolean> {
	return sessionFacade.isAuthorized$;
}

export interface Reset {
	reset(): void;
}

export type Resetter<T> = T extends Reset
	? Reset
	: T extends EntityCollectionServiceBase<any>
	? EntityCollectionServiceBase<any>
	: never;

export const RESETTERS: InjectionToken<Type<Resetter<any>>[]> = new InjectionToken<
	Type<Resetter<any>>[]
>('@site-core/session/RESETTERS');
