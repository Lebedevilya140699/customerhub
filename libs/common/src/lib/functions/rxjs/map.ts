import { Mapper } from '@nartc/automapper';
import { Constructible, Dict, MapOptions } from '@nartc/automapper/dist/types';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function Map<
	TSource extends Dict<TSource> = any,
	TDestination extends Dict<TDestination> = any
>(
	destination: Constructible<TDestination>,
	sourceCtor?: Constructible<TSource>,
	options?: MapOptions<TSource, TDestination>
): OperatorFunction<TSource, TDestination> {
	return (source: Observable<TSource>): Observable<TDestination> => {
		return source.pipe<TDestination>(
			map((res) => Mapper.map(res, destination, sourceCtor, options))
		);
	};
}
