import { deflate, inflate, Serialize, JsonType } from 'serialazy';
import { Constructor } from 'serialazy/lib/dist/types';
import ObjectPropertySerializer from 'serialazy/lib/dist/object_property_serializer';

export function SerializeArray<Type>(
	optionsOrCtor?: Constructor<Type> | ObjectPropertySerializer.Options,
	options?: ObjectPropertySerializer.Options
) {
	if (!!options) {
		return serializeTypedArray<Type>(optionsOrCtor as Constructor<Type>, options);
	} else {
		return serializePrimitiveArray<Type>(optionsOrCtor as ObjectPropertySerializer.Options);
	}
}

function serializePrimitiveArray<Type>(options?: ObjectPropertySerializer.Options) {
	return Serialize({
		//@ts-ignore
		up: (serializedValue: Type[]) => serializedValue,
		down: (originalValue: JsonType) => originalValue,
		...options,
	});
}

function serializeTypedArray<Type>(
	ctor: Constructor<Type>,
	options?: ObjectPropertySerializer.Options
) {
	return Serialize({
		down: (instances: Array<Type>) => {
			if (!instances) {
				return [];
			}
			return instances.map((instance) => deflate(instance));
		},
		up: (jsonObjs: Array<any>) => {
			if (!jsonObjs) {
				return [];
			}
			return jsonObjs.map((jsonObj) => inflate(ctor, jsonObj));
		},
		...options,
	});
}
