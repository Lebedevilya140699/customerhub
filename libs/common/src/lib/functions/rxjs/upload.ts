import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { scan } from 'rxjs/operators';

export enum UploadState {
	NULL,
	IN_PROGRESS,
	DONE,
}

export interface UploadProgress<T> {
	progress: number;
	state: UploadState;
	result: T | null;
}

export interface UploadProgressCallback<T> {
	(progress: UploadProgress<T>): void;
}

export interface UploadedCallback<T> {
	(result: UploadProgress<T>): void;
}

export function upload<T>(
	uploadedCallback: UploadedCallback<T>,
	progressCallback?: UploadProgressCallback<T>
): OperatorFunction<HttpEvent<T>, UploadProgress<T>> {
	return (source: Observable<HttpEvent<T>>) => {
		return source.pipe(
			scan(
				(prev: UploadProgress<T>, event: HttpEvent<T>): UploadProgress<T> => {
					let progress: UploadProgress<T>;

					if (event.type === HttpEventType.UploadProgress) {
						progress = {
							progress: event.total
								? Math.round((100 * event.loaded) / event.total)
								: prev.progress,
							state: UploadState.IN_PROGRESS,
							result: null,
						};

						progressCallback?.(progress);

						return progress;
					} else if (event.type === HttpEventType.Response) {
						progress = {
							progress: 100,
							state: UploadState.DONE,
							result: event.body,
						};

						uploadedCallback(progress);

						return progress;
					} else {
						return prev;
					}
				},
				{ state: UploadState.NULL, progress: 0, result: null }
			)
		);
	};
}
