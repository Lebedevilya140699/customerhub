import { Type } from '@angular/core';
import { StorageService } from 'ngx-webstorage/lib/core/interfaces/storageService';
import { MapperProfileConstructor } from './mapper-profile-constructor';

export interface ICoreOptions {
	//readonly localeId: string;
	readonly logoutUrl: string;
	readonly isProduction: boolean;
	readonly authorizationKey: string;
	readonly authorizationMethod: string;
	readonly apiUrl: string;
	readonly accessTokenKey: string;
	readonly loginUrl: string;
	readonly profiles: MapperProfileConstructor[];
	readonly storage: Type<StorageService>;
	//readonly disclaimersUrl: string;
	//readonly recoveryTokenKey: string;
	readonly rootTitle: string;
	readonly application: string;
}
