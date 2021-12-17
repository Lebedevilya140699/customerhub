import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function where<T>(
	filterFn: (value: T, index?: number, array?: T[]) => boolean
): MonoTypeOperatorFunction<T[]> {
	return (source: Observable<T[]>) => {
		return source.pipe<T[]>(
			map<T[], T[]>((arr: T[]) => arr.filter(filterFn))
		);
	};
}
