import { Serialize } from 'serialazy';

export class Config {
	@Serialize({
		name: 'api_url',
	})
	public apiUrl: string;
	@Serialize({
		name: 'static_url',
	})
	public staticUrl: string;

	constructor() {
		this.apiUrl = '';
		this.staticUrl = '';
	}
}
