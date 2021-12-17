import { Serialize } from 'serialazy';

export class BaseError extends Error {
	@Serialize({
		name: 'error_code',
		nullable: true,
		optional: true,
	})
	public name: string;
	public data?: any;

	public constructor() {
		super();
		this.name = '';
	}

	public toString(): string {
		return `${this.name}: ${this.message}`;
	}
}
