import { AutoMap } from '@nartc/automapper';
import { ListInfo } from './list-info';
import { User } from '@core/domain';

export class Users {
	@AutoMap(() => ListInfo)
	public listInfo?: ListInfo | null;
	@AutoMap(() => User)
	public items?: User[] | null;
}
