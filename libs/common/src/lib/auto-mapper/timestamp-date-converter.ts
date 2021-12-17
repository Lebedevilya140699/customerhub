import { Converter } from '@nartc/automapper';

export class TimestampDateConverter implements Converter<Date, number | null> {
	public convert(source: Date | null): number | null {
		if (!source) {
			return null;
		}
		return source.getTime();
	}
}
