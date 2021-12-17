import { Serialize, JsonObject } from 'serialazy';
import ObjectPropertySerializer from 'serialazy/lib/dist/object_property_serializer';

export function SerializeObject<T = Record<string, string>>(
	options?: ObjectPropertySerializer.Options
) {
	return Serialize<JsonObject, T>({
		...options,
		down: (originalValue) => (originalValue as unknown) as JsonObject,
		up: (serializedValue) => (serializedValue as unknown) as T,
	});
}
