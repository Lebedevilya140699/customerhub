import { Serialize } from 'serialazy';
import { BaseError } from '../error';

export class ApiErrorResponse extends BaseError {
	@Serialize({
		name: 'error_message',
		nullable: true,
		optional: true,
	})
	public message: string;

	@Serialize({
		name: 'request_id',
		nullable: true,
		optional: true,
	})
	public requestId?: string;

	constructor() {
		super();
		this.message = '';
		this.name = '';
	}

	public toString(): string {
		return super.toString() + ` | ${this.requestId}`;
	}
}
