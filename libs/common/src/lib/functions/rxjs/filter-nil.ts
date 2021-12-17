import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export type Diff<T, U> = T extends U ? never : T;

export const filterNil = <T>(source: Observable<T | undefined | null>) =>
	source.pipe(
		filter(
			(value): value is Diff<T, null | undefined> =>
				value !== null && typeof value !== 'undefined'
		)
	);
