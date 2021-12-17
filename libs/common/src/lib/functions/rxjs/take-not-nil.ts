import { Observable, OperatorFunction } from 'rxjs';
import { take } from 'rxjs/operators';
import { filterNil } from './filter-nil';

type Diff<T, U> = T extends U ? never : T;

export function takeNotNil<T>(
	count: number
): OperatorFunction<T | undefined | null, Diff<T, null | undefined>> {
	return (source: Observable<T | undefined | null>) => {
		return source.pipe(filterNil, take(count));
	};
}
