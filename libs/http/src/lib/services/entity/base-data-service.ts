import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {
	DataServiceError,
	DefaultDataService,
	DefaultDataServiceConfig,
	HttpMethods,
	HttpUrlGenerator,
} from '@ngrx/data';
import { IdSelector } from '@ngrx/entity';
import {
	BaseError,
	ContentType,
	HttpConsumer,
	HttpMethod,
	IHttpOptions,
	ResponseType,
} from '@core/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '../http.service';

export class BaseDataService<T> extends DefaultDataService<T> {
	protected selectId?: IdSelector<T>;
	protected selectUserId?: IdSelector<T>;

	constructor(
		entityName: string,
		http: HttpClient,
		httpUrlGenerator: HttpUrlGenerator,
		config: DefaultDataServiceConfig,
		private readonly httpService: HttpService
	) {
		super(entityName, http, httpUrlGenerator, config);
	}

	public add<TResponse>(entity: T): Observable<TResponse> {
		return this.execute<TResponse>(HttpMethod.POST, this.entityUrl + HttpMethod.POST, entity, {
			pathArgs: [this.selectUserId!(entity)],
		});
	}

	public upsert<TResponse>(entity: T): Observable<TResponse> {
		return this.execute<TResponse>(
			//@ts-ignore
			HttpMethod.PATCH,
			this.entityUrl + HttpMethod.PATCH,
			entity,
			{
				pathArgs: [this.selectUserId!(entity)],
			}
		);
	}

	public getById<TResponse extends undefined | {}>(id: number): Observable<TResponse> {
		return this.execute<TResponse>(HttpMethod.GET, this.entityUrl + HttpMethod.GET, undefined, {
			pathArgs: [id],
		});
	}

	public getAllByUserId<TResponse>(userId: number): Observable<TResponse[]> {
		return this.execute<any>(HttpMethod.GET, this.entityUrl + HttpMethod.GET, undefined, {
			pathArgs: [userId],
		});
	}

	protected execute<
		TResponse,
		TRequest = any,
		TResponseType extends ResponseType = ResponseType.JSON
	>(
		method: HttpMethods,
		url: string,
		data?: any,
		options?: {
			pathArgs?: any[];
			params?:
				| HttpParams
				| {
						[param: string]: string | string[];
				  };
			contentType?: ContentType;
			responseType?: TResponseType;
		}
	): Observable<TResponse> {
		const httpOptions: IHttpOptions<TRequest, TResponseType> = {
			body: data,
			endpoint: url,
			...options,
		};

		return this.httpService.request<TResponse, TRequest, TResponseType>(httpOptions).pipe(
			catchError((err: BaseError | HttpErrorResponse | object) => {
				return throwError(
					new DataServiceError(err, {
						method: method,
						url,
						data,
						options,
					})
				);
			})
		) as Observable<TResponse>;
	}

	protected consume<TResponse, TRequest = undefined>(
		consumer: HttpConsumer<TResponse, TRequest>
	): HttpConsumer<TResponse, TRequest> {
		return this.httpService.consume<TResponse, TRequest>(consumer).pipe(
			catchError((err: BaseError | HttpErrorResponse | object) => {
				return throwError(
					new DataServiceError(err, {
						method: HttpMethod.POST,
						url: consumer.options.endpoint!,
						data: consumer.options.body,
						options: consumer.options.params,
					})
				);
			})
		) as HttpConsumer<TResponse, TRequest>;
	}
}
