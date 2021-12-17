import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Conditionally map value
 *
 * ```typescript
 * of({ isInsipid: true }).pipe(
 * 		condition(x => x.isInsipid),
 * 		thenMap(_x => 'addSalt'),
 * 		elseMap(_x => 'eat')
 * );
 * ```
 * @param project
 */
export function condition<T>(project: (x: T) => boolean): OperatorFunction<T, [boolean, T]> {
	return (source: Observable<T>) => {
		return source.pipe(
			map((obj: T) => {
				return [project(obj), obj];
			})
		);
	};
}

export function thenMap<T, R>(project: (x: T) => R): OperatorFunction<[boolean, T], any> {
	return (source: Observable<[boolean, T]>) => {
		return source.pipe(
			map(([c, obj]: [boolean, T]) => {
				if (!c) return [c, obj];

				return project(obj);
			})
		);
	};
}

export function elseMap<T, R>(project: (x: T) => R): OperatorFunction<[boolean, T], R> {
	return (source: Observable<[boolean, T]>) => {
		return source.pipe(
			map((arg: [boolean, T] | R) => {
				if (Array.isArray(arg) && typeof arg[0] === 'boolean' && !arg[0])
					return project(arg[1]);

				return arg as R;
			})
		);
	};
}
