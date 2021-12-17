import { Converter } from '@nartc/automapper';

export class ISOStringDateConverter implements Converter<string, Date | null> {
	public convert(source: string | null): Date | null {
		if (!source) {
			return null;
		}
		return new Date(source);
	}
}
