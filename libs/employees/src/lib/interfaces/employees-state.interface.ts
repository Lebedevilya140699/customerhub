import { ILoadable } from '@core/common';

export interface IEmployeesState extends ILoadable {
	ids: number[];
	cv: any | null;
	isDownloaded: boolean;
}
