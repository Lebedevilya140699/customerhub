import { HttpService } from '../services';

export abstract class BaseHttpService<TConfig extends { apiUrl: string } = { apiUrl: string }> {
	protected constructor(protected readonly http: HttpService<TConfig>) {}
}
