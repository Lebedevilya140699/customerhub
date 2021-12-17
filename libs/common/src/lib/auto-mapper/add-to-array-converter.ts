import { Converter } from '@nartc/automapper';

export class AddToArrayConverter<T> implements Converter<Array<T>, Array<T> | null> {
	constructor(private sourceObj: T) {}
	public convert(source: Array<T>): Array<T> | null {
		if (!source) {
			return null;
		}

		return [...source, this.sourceObj];
	}
}
