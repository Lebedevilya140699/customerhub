import { AsyncSubject, Observable } from 'rxjs';
import { IHttpOptions } from '../../interfaces';
import { ApiErrorResponse } from './api-error-response';

export class HttpConsumer<TResponse = undefined, TRequest = undefined> extends AsyncSubject<
	TResponse extends undefined ? undefined : TResponse
> {
	constructor(public readonly options: Partial<IHttpOptions<TRequest>> = {}) {
		super();
	}

	public next(value: TResponse extends undefined ? undefined : TResponse): void {
		super.next(value);
	}

	public asObservable(): Observable<TResponse extends undefined ? undefined : TResponse> {
		return super.asObservable();
	}

	public withEndpoint(endpoint: string): this {
		this.options.endpoint = endpoint;

		return this;
	}

	public withBody(body: any): this {
		this.options.body = body;

		return this;
	}

	public withArgs(args: any[]): this {
		this.options.pathArgs = args;

		return this;
	}

	public error(err: ApiErrorResponse): void {
		super.error(err);
	}
}
