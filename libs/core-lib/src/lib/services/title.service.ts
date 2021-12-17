import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { String } from 'typescript-string-operations';
import { ROOT_TITLE } from '../injection-tokens/root-title';

@Injectable()
export class TitleService {
	constructor(@Inject(ROOT_TITLE) private readonly rootTitle: string) {}

	public getPath(path?: string): Observable<string> {
		if (!!path && !String.IsNullOrWhiteSpace(path)) {
			return path ? of(path.charAt(0).toUpperCase() + path.slice(1)) : of(this.rootTitle);
		} else {
			return of(this.rootTitle);
		}
	}
}
