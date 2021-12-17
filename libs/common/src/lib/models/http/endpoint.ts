import { Constructible } from '@nartc/automapper';
import { String } from 'typescript-string-operations';
import { ContentType, ResponseType } from '../../enums';
import { HttpMethod } from '../../enums';

export class Endpoint<TResponse = any, TRequest = any> {
	public pathFormat: string;
	public httpMethod: HttpMethod;
	public response?: Constructible<TResponse>;
	public request?: Constructible<TRequest>;
	public contentType: ContentType = ContentType.JSON;
	public responseType: ResponseType = ResponseType.JSON;

	constructor() {
		this.pathFormat = String.Empty;
		this.httpMethod = HttpMethod.GET;
	}

	public formatPath(args: string[]): string {
		if (args.length === 0) return this.pathFormat;
		return String.Format(this.pathFormat, ...args);
	}
}
