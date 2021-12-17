import { AutoMap } from '@nartc/automapper';

export class Task {
	@AutoMap()
	public id?: number | null;
	@AutoMap()
	public title?: string | null;
	@AutoMap()
	public type?: string | null;
	@AutoMap()
	public comment?: string | null;
	@AutoMap()
	public tags?: string[] | null;
	@AutoMap()
	public createdAt?: Date | null;
	@AutoMap()
	public updatedAt?: Date | null;
	@AutoMap()
	public reporter?: string | null;
	@AutoMap()
	public reporterId?: number | null;
}
