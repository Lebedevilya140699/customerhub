import { StorageService } from 'ngx-webstorage/lib/core/interfaces/storageService';
import { Observable } from 'rxjs';

export abstract class BaseStorage implements StorageService {
	public abstract clear(key?: string): any;

	public abstract getStrategyName(): string;

	public abstract observe(key: string): Observable<any>;

	public abstract retrieve(key: string): any;

	public abstract store(key: string, value: any): any;
}
