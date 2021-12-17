import { Injector, Type } from '@angular/core';
import { EntityCollectionServiceBase } from '@ngrx/data';
import { Resetter, RESETTERS } from '../tokens';

export function reset(injector: Injector): void {
	const resetters: Type<Resetter<any>>[] = injector.get(RESETTERS);

	resetters.forEach((x) => {
		try {
			const resetter: Resetter<any> = injector.get<Resetter<any>>(x);

			if (resetter instanceof EntityCollectionServiceBase) {
				(resetter as EntityCollectionServiceBase<any>).clearCache();
			} else {
				resetter.reset();
			}
		} catch (e) {
			// Do nothing
		}
	});
}
