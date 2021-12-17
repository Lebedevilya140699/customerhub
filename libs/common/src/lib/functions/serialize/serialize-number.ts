import { Serialize } from 'serialazy';
import ObjectPropertySerializer from 'serialazy/lib/dist/object_property_serializer';

export function SerializeNumber(options?: ObjectPropertySerializer.Options) {
	return Serialize({
		up: (serializedValue: number | null) => serializedValue,
		...options,
	});
}
