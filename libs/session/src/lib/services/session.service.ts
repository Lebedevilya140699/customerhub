import { Inject, Injectable } from '@angular/core';
import { ACCESS_TOKEN_KEY, BaseStorage } from '@core/common';

@Injectable()
export class SessionService {
	constructor(
		private readonly localStorage: BaseStorage,
		@Inject(ACCESS_TOKEN_KEY) private readonly accessTokenKey: string
	) {}

	public retrieveToken(): string | null {
		return this.localStorage.retrieve(this.accessTokenKey);
	}

	public setToken(token: string | null): void {
		this.localStorage.store(this.accessTokenKey, token);
	}

	public clear(): void {
		this.localStorage.clear(this.accessTokenKey);
	}
}
