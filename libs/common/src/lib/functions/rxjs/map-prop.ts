import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export type Projector<T, p extends keyof T = keyof T> = (src: T) => T[p];
export type ProjectorOrFallback<T, R, p extends keyof T = keyof T, Fb = T[p]> =
	| Fb
	| ((property: T[p]) => R);

/**
 * Observable operator function to select a property from source
 * @param selector - Property selector
 * @param projectorOrFallback - Property projector or fallback value
 */
export function mapProp<T, R, p extends keyof T = keyof T>(
	selector: Projector<T, p>,
	projectorOrFallback: (property: T[p]) => R
): OperatorFunction<T | null | undefined, R>;
export function mapProp<T, p extends keyof T = keyof T, Fb = T[p]>(
	selector: Projector<T, p>,
	projectorOrFallback?: Fb
): OperatorFunction<T | null | undefined, Fb>;
export function mapProp<T, R, p extends keyof T = keyof T, Fb = T[p]>(
	selector: Projector<T, p>,
	projectorOrFallback: ProjectorOrFallback<T, R, p>
): OperatorFunction<T | null | undefined, Fb | R> {
	return (source: Observable<T | null | undefined>): Observable<Fb | R> => {
		return source.pipe(
			map((src: T | null | undefined) => {
				const property = !!src ? selector(src) : null;
				if (typeof projectorOrFallback === 'function') {
					return (<Function>projectorOrFallback)(property);
				} else {
					return property ?? projectorOrFallback;
				}
			})
		);
	};
}
