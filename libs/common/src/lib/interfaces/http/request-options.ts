import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseType } from '../../enums/http';

export interface RequestOptions<TResponseType extends ResponseType = ResponseType.JSON> {
	body?: any;
	headers?:
		| HttpHeaders
		| {
				[header: string]: string | string[];
		  };
	reportProgress?: boolean;
	params?:
		| HttpParams
		| {
				[param: string]: string | string[];
		  };
	responseType?: TResponseType;
	withCredentials?: boolean;
}
