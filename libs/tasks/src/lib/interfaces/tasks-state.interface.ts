import { ILoadable } from '@core/common';

export interface ITasksState extends ILoadable {
	taskIds: number[];
	selectedTaskId: number | null;
}
