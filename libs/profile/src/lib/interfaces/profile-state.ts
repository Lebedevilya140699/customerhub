import { ILoadable } from '@core/common';

export interface IProfileState extends ILoadable {
	id: number | null;
	cv: any | null;
	isDownloaded: boolean;
}
