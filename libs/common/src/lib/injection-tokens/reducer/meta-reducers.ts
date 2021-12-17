import { FactoryProvider, InjectionToken } from '@angular/core';
import { MetaReducer, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';

export const META_REDUCERS: InjectionToken<MetaReducer[]> = new InjectionToken<MetaReducer[]>(
	'@site-core/common/META_REDUCERS'
);

export const _META_REDUCERS = (reducers: MetaReducer[][]) => {
	return reducers.flat();
};

export const META_REDUCERS_PROVIDERS: FactoryProvider = {
	provide: USER_PROVIDED_META_REDUCERS,
	useFactory: _META_REDUCERS,
	deps: [META_REDUCERS],
};
