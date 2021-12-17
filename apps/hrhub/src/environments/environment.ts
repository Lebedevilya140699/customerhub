import { IEnvironment } from '@core/common';
import { environmentBase } from './environment.base';

export const environment: IEnvironment = {
	...environmentBase,
	production: false,
};
