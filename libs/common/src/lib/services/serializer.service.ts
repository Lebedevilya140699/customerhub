import { Injectable } from '@angular/core';
import { JsonType, deflate, inflate } from 'serialazy';
//import Constructable from 'serialazy/lib/dist/types/serializable';
import { Constructor } from 'serialazy/lib/dist/types';

@Injectable({
	providedIn: 'root',
})
export class SerializerService {
	public serialize(serializable: any): JsonType {
		let serialized: JsonType;
		if (serializable === null || serializable === undefined) {
			serialized = serializable;
		} else {
			//TODO: Проверить сериалайзер на новой версии, что произойдет, если JSON будет действительно невалидным
			/*const { down } = JsonTypeSerializer.pickForValue(serializable);
			if (!down) {
				throw new Error(`Value is not serializable: ${serializable}`);
			}*/
			serialized = deflate(serializable);
		}

		return serialized;
	}

	public deserialize<T>(ctor: Constructor<T>, serialized: any): T {
		if (typeof ctor !== 'function') {
			throw new Error('Expecting a constructor function');
		}

		/*const { up } = JsonTypeSerializer.pickForType(ctor);

		if (!up) {
			throw new Error(`Type is not serializable: ${ctor.name}`);
		}*/

		return inflate(ctor, serialized);
	}
}
