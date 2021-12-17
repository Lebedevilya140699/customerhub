import { Converter } from '@nartc/automapper';

export class UnixDateConverter implements Converter<number, Date | null> {
	public convert(source: number | null): Date | null {
		if (!source) {
			return null;
		}

		if (source > 8640000000000000 || source < -8640000000000000) return null;

		return new Date(source);
	}
}
