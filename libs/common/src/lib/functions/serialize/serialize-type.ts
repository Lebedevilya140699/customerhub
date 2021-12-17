import { deflate, inflate, Serialize } from 'serialazy';
import { Constructor } from 'serialazy/lib/dist/types';
import ObjectPropertySerializer from 'serialazy/lib/dist/object_property_serializer';

export function SerializeType<T>(ctor: Constructor<T>, options?: ObjectPropertySerializer.Options) {
	return Serialize({
		down: (originalValue) => deflate(originalValue),
		up: (serializedValue) => inflate(ctor, serializedValue),
		...options,
	});
}
