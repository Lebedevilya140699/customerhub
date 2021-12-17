import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { scan } from 'rxjs/operators';

export enum DownloadState {
	NULL,
	IN_PROGRESS,
	DONE,
}

export interface DownloadProgress<T> {
	progress: number;
	state: DownloadState;
	result: T | null;
}

export interface DownloadProgressCallback<T> {
	(progress: DownloadProgress<T>): void;
}

export interface DownloadedCallback<T> {
	(result: DownloadProgress<T>): void;
}

export function download<T>(
	downloadedCallback: DownloadedCallback<T>,
	progressCallback?: DownloadProgressCallback<T>
): OperatorFunction<HttpEvent<T>, DownloadProgress<T>> {
	return (source: Observable<HttpEvent<T>>) => {
		return source.pipe(
			scan(
				(prev: DownloadProgress<T>, event: HttpEvent<T>): DownloadProgress<T> => {
					let progress: DownloadProgress<T>;

					if (event.type === HttpEventType.DownloadProgress) {
						progress = {
							progress: event.total
								? Math.round((100 * event.loaded) / event.total)
								: prev.progress,
							state: DownloadState.IN_PROGRESS,
							result: null,
						};

						progressCallback?.(progress);

						return progress;
					} else if (event.type === HttpEventType.Response) {
						progress = {
							progress: 100,
							state: DownloadState.DONE,
							result: event.body,
						};

						downloadedCallback(progress);

						return progress;
					} else {
						return prev;
					}
				},
				{ state: DownloadState.NULL, progress: 0, result: null }
			)
		);
	};
}
