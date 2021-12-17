import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SerializerService } from '@core/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Constructor } from 'serialazy/lib/dist/types';
import { JsonType } from 'serialazy';
import { CONFIG_CONSTRUCTABLE } from '../injection-tokens/config-constructible';
import { CONFIG_URL } from '../injection-tokens/config-url';
import { Config } from './config';

@Injectable()
export class ConfigService<TConfig> {
	constructor(
		private readonly httpClient: HttpClient,
		@Inject(CONFIG_URL) private readonly configUrl: string,
		private readonly config: Config<TConfig>,
		@Inject(CONFIG_CONSTRUCTABLE)
		private readonly configConstructable: Constructor<TConfig>,
		private readonly serializerService: SerializerService
	) {}

	public getConfig(): Observable<TConfig | null> {
		return this.httpClient.get<JsonType>(this.configUrl).pipe(
			map((json: JsonType) => {
				return this.serializerService.deserialize<TConfig>(this.configConstructable, json);
			}),
			tap((config: TConfig | null) => {
				this.config.next(config);
			})
		);
	}
}
