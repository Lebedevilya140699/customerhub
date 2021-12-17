import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Mapper } from '@nartc/automapper';
import {
	ApiErrorResponse,
	ContentType,
	download,
	DownloadedCallback,
	DownloadProgress,
	Endpoint,
	filterNil,
	HttpConsumer,
	IHttpOptions,
	RequestOptions,
	ResponseType,
	SerializerService,
	upload,
	UploadProgress,
	UploadProgressCallback,
} from '@core/common';
import { Config } from '@core/config';
import { EndpointNotSupportedException } from '@core/domain';
import { Observable, OperatorFunction, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { String } from 'typescript-string-operations';
import { EndpointManagerService } from './endpoint-manager.service';

@Injectable()
export class HttpService<TConfig extends { apiUrl: string } = { apiUrl: string }> {
	constructor(
		private readonly http: HttpClient,
		private readonly config: Config<TConfig>,
		protected readonly serializer: SerializerService,
		@Optional() private readonly endpoints?: EndpointManagerService
	) {}

	public request<
		TResponse = undefined,
		TRequest = any,
		TResponseType extends ResponseType = ResponseType.JSON
	>(
		options: IHttpOptions<TRequest, TResponseType>
	): Observable<TResponse extends undefined ? undefined : TResponse> {
		return this._request<TResponse, TRequest, TResponseType>(options);
	}

	/**
	 * Used to consume responses asynchronously.
	 * Can be used in Actions when you need to receive the result of the http call.
	 * Create an action with consumer as payload
	 * -> call HttpService.consume inside an effect
	 * -> fire an Action in effect as you do always
	 * -> process the response in component or wherever you need it
	 * @param consumer - HttpConsumer which Observer methods will be called on subscribe
	 */
	public consume<TResponse = undefined, TRequest = any>(
		consumer: HttpConsumer<TResponse, TRequest>
	): HttpConsumer<TResponse, TRequest> {
		return this._request<TResponse, TRequest>(consumer.options).pipe(
			take(1),
			tap(
				(x) => {
					consumer.next(x);
					consumer.complete();
				},
				(e) => consumer.error(e),
				() => consumer.complete()
			),
			switchMap(() => consumer)
		) as HttpConsumer<TResponse, TRequest>;
	}

	public download<
		TResponse = Blob,
		TRequest = undefined,
		TResponseType extends ResponseType = ResponseType.BLOB
	>(
		options: IHttpOptions<TRequest, TResponseType>,
		downloaded: DownloadedCallback<TResponse>
	): Observable<DownloadProgress<TResponse>> {
		const { opts, endpoint } = this._constructOptions<TRequest, TResponseType>(options);

		return this._formatPath<TRequest, TResponseType>(endpoint, options).pipe(
			switchMap(
				(path): OperatorFunction<string, HttpEvent<TResponse>> =>
					//@ts-ignores
					this.http.request<TResponse>(endpoint.httpMethod, path, {
						...opts,
						observe: 'events',
					})
			),
			download(downloaded)
		);
	}

	public upload<TResponse = any, TRequest = undefined>(
		options: IHttpOptions<TRequest>,
		uploaded: UploadProgressCallback<TResponse>
	): Observable<UploadProgress<TResponse>> {
		const { opts, endpoint } = this._constructOptions(options);

		return this._formatPath(endpoint, options).pipe(
			switchMap((x) =>
				this.http.post<TResponse>(x, opts.body, {
					...opts,
					observe: 'events',
				})
			),
			upload(uploaded)
		);
	}

	protected _constructOptions<TRequest, TResponseType extends ResponseType = ResponseType.JSON>(
		options: IHttpOptions<TRequest, TResponseType>
	): { opts: RequestOptions<TResponseType>; endpoint: Endpoint } {
		if (!options.endpoint || String.IsNullOrWhiteSpace(options.endpoint)) {
			throw new EndpointNotSupportedException();
		}

		const endpoint: Endpoint | undefined = this.endpoints!.get(options.endpoint);

		return this._mergeOptionsAndEndpoint<TRequest, TResponseType>(options, endpoint);
	}

	protected _mergeOptionsAndEndpoint<TRequest, TResponseType extends ResponseType>(
		options: IHttpOptions<TRequest, TResponseType>,
		endpoint: Endpoint
	): { opts: RequestOptions<TResponseType>; endpoint: Endpoint } {
		const opts: RequestOptions<TResponseType> = {
			body: undefined,
			params: options.params,
			// @ts-ignore
			responseType: options.responseType ?? endpoint.responseType,
		};

		opts.headers = {
			...options.headers,
		};

		if ((options.contentType ?? endpoint.contentType) === ContentType.FORM_DATA) {
			opts.body = options.body;
		} else if (options.body !== undefined) {
			let newBody: any = options.body;
			if (!!endpoint.request && !(options.body instanceof endpoint.request)) {
				newBody = Mapper.map(options.body, endpoint.request);
			}
			opts.body = this.serializer.serialize(newBody);
		}

		return {
			opts,
			endpoint,
		};
	}

	private _request<
		TResponse = undefined,
		TRequest = any,
		TResponseType extends ResponseType = ResponseType.JSON
	>(
		options: IHttpOptions<TRequest, TResponseType>
	): Observable<TResponse extends undefined ? undefined : TResponse> {
		try {
			const { opts, endpoint } = this._constructOptions<TRequest, TResponseType>(options);

			return this._formatPath(endpoint, options).pipe(
				switchMap((path) =>
					this.http.request<any>(
						endpoint.httpMethod,
						path,
						//@ts-ignore
						opts
					)
				),
				map((response: any) => {
					if (
						response === undefined ||
						String.IsNullOrWhiteSpace(response) ||
						typeof response === 'string' ||
						typeof response === 'number' ||
						opts.responseType !== ResponseType.JSON
					) {
						return response;
					}
					if (Array.isArray(response)) {
						return response.map((item: any) => {
							return this.serializer.deserialize<TResponse>(endpoint.response!, item);
						});
					}

					return this.serializer.deserialize<TResponse>(endpoint.response!, response);
				}),
				catchError((error: HttpErrorResponse) => this._handleError(error))
			);
		} catch (e) {
			return this._handleError(e);
		}
	}

	private _handleError(error: any): Observable<never> {
		return throwError(
			error instanceof HttpErrorResponse && error.status !== 0
				? this.serializer.deserialize(ApiErrorResponse, error.error)
				: error
		);
	}

	private _formatPath<TRequest, TResponseType extends ResponseType = ResponseType.JSON>(
		endpoint: Endpoint,
		options: IHttpOptions<TRequest, TResponseType>
	): Observable<string> {
		return this.config.pipe(
			filterNil,
			map((x) => x.apiUrl),
			map((x) => x + endpoint.formatPath(options.pathArgs ?? []))
		);
	}
}
