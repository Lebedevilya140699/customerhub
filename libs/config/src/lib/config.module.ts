import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { Constructor } from 'serialazy/lib/dist/types';
import { CONFIG_CONSTRUCTABLE } from './injection-tokens/config-constructible';
import { CONFIG_URL } from './injection-tokens/config-url';
import { Config } from './services/config';
import { ConfigService } from './services/config.service';

export function loadConfig<TConfig>(
	configService: ConfigService<TConfig>
): () => Promise<TConfig | null> {
	return () => {
		return configService.getConfig().toPromise();
	};
}

export interface IConfigOptions<TConfig> {
	readonly configUrl: string;
	readonly configConstructable: Constructor<TConfig>;
}

export const CONFIG_PROVIDERS: Provider[] = [Config];

@NgModule({
	imports: [CommonModule],
	providers: [ConfigService],
})
export class ConfigModule {
	public static forRoot<TConfig>(
		options: IConfigOptions<TConfig>
	): ModuleWithProviders<ConfigModule> {
		return {
			ngModule: ConfigModule,
			providers: [
				{
					provide: CONFIG_URL,
					useValue: options.configUrl,
				},
				{
					provide: APP_INITIALIZER,
					useFactory: loadConfig,
					deps: [ConfigService],
					multi: true,
				},
				{
					provide: CONFIG_CONSTRUCTABLE,
					useValue: options.configConstructable,
				},
				CONFIG_PROVIDERS,
			],
		};
	}
}
