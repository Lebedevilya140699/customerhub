import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ContentType, ResponseType } from '../../enums';

export interface IHttpOptions<T = any, TResponseType extends ResponseType = ResponseType.JSON> {
	endpoint?: string;
	body?: T;
	pathArgs?: any[];
	headers?:
		| HttpHeaders
		| {
				[header: string]: string | string[];
		  };
	observe?: 'body' | 'events';
	params?:
		| HttpParams
		| {
				[param: string]: string | string[];
		  };
	responseType?: TResponseType;
	reportProgress?: boolean;
	withCredentials?: boolean;
	contentType?: ContentType;
}
