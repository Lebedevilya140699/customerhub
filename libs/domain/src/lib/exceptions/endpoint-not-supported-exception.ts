import { Exception } from './exception';

export class EndpointNotSupportedException extends Exception {
	constructor(key?: string) {
		super(`Endpoint with key ${key} not supported`);
	}
}
