import { Serialize } from 'serialazy';

export class Exception extends Error {
	@Serialize()
	public name: string = super.name;
	@Serialize()
	public message: string = super.message;
}
