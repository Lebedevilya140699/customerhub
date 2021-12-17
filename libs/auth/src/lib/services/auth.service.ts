import { Injectable } from '@angular/core';
import { HttpConsumer, IHttpOptions } from '@core/common';
import { BaseHttpService, HttpService } from '@core/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService extends BaseHttpService {
	constructor(http: HttpService) {
		super(http);
	}

	public submitForm<TResponse>(
		options: IHttpOptions
	): Observable<TResponse extends undefined ? undefined : TResponse> {
		return this.http.request<TResponse>(options);
	}

	public submitFormAsync<TResponse, TRequest>(
		consumer: HttpConsumer<TResponse, TRequest>
	): HttpConsumer<TResponse, TRequest> {
		return this.http.consume<TResponse, TRequest>(consumer);
	}
}
