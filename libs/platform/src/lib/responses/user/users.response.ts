import { AutoMap } from '@nartc/automapper';
import { SerializeArray, SerializeType } from '@core/common';
import { ListInfoResponse } from './list-info.response';
import { UserResponse } from './user.response';

export class UsersResponse {
	@SerializeType(ListInfoResponse, {
		name: 'listInfo',
		nullable: true,
		optional: true,
	})
	@AutoMap(() => ListInfoResponse)
	public listInfo?: ListInfoResponse | null;

	@SerializeArray(UserResponse, {
		nullable: true,
		optional: true,
	})
	@AutoMap()
	public items?: UserResponse[] | null;
}
