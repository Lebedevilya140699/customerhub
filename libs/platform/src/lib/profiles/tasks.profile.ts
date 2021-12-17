import { AutoMapper, convertUsing, mapFrom, ProfileBase } from '@nartc/automapper';
import { TaskResponse } from '@core/platform';
import { Task } from '@core/domain';
import { UnixDateConverter } from '@core/common';

export class TasksProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super();

		mapper
			.createMap(TaskResponse, Task)
			.forMember(
				(x) => x.reporterId,
				mapFrom((x) => x.reporter?.id)
			)
			.forMember(
				(x) => x.reporter,
				mapFrom((x) => x.reporter?.firstName + ' ' + x.reporter?.lastName)
			)
			.forMember(
				(x) => x.createdAt,
				convertUsing(new UnixDateConverter(), (x) => x.createdAt)
			)
			.forMember(
				(x) => x.updatedAt,
				convertUsing(new UnixDateConverter(), (x) => x.updatedAt)
			);
	}
}
