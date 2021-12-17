import { Serialize } from 'serialazy';

export class Token {
	@Serialize({
		name: 'role',
		optional: true,
	})
	public role?: string;

	@Serialize({
		down: (serializedValue: number) => serializedValue.toString(),
		// tslint:disable-next-line:radix
		up: (originalValue: string) => Number.parseInt(originalValue),
		name: 'expires',
		optional: true,
	})
	public expires?: number;

	@Serialize({
		down: (serializedValue: number) => serializedValue.toString(),
		// tslint:disable-next-line:radix
		up: (originalValue: string) => Number.parseInt(originalValue),
		name: 'user_id',
		optional: true,
	})
	public userId?: number;

	@Serialize({
		name: 'email',
		optional: true,
	})
	public email?: string;

	@Serialize({
		name: 'roles',
		optional: true,
	})
	public roles?: string;

	@Serialize({
		name: 'session_id',
		optional: true,
	})
	public sessionId?: string;
}
