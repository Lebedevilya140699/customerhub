import { InjectionToken, Injector } from '@angular/core';
import { isObservable, Observable } from 'rxjs';
import { isPromise } from 'rxjs/internal-compatibility';
import { takeUntil } from 'rxjs/operators';

export interface IInitializer {
	init(): Observable<void> | Promise<void> | void;
}

export interface IInitializerFn {
	(): Observable<void> | Promise<void> | void;
}

export type TInitializer = IInitializer | IInitializerFn;

export const INITIALIZER: InjectionToken<TInitializer[]> = new InjectionToken<TInitializer[]>(
	'@site-core/session/INITIALIZER'
);

export async function initialize(
	injector: Injector,
	takeUntilNotifier: Observable<any>
): Promise<void> {
	const initializers: TInitializer[] = injector.get(INITIALIZER);

	const init: Promise<void>[] = initializers.map((initializer) => {
		return new Promise<void>((resolve) => {
			let resultFn: ReturnType<IInitializerFn>;

			if (typeof initializer === 'function') {
				resultFn = initializer() as ReturnType<IInitializerFn>;
			} else {
				resultFn = initializer.init.apply(initializer);
			}

			if (isPromise(resultFn)) {
				return resultFn.then(resolve);
			}

			if (isObservable(resultFn)) {
				return resultFn.pipe(takeUntil(takeUntilNotifier)).toPromise().then(resolve);
			}

			return Promise.resolve(resolve);
		});
	});

	await Promise.all(init);
}
