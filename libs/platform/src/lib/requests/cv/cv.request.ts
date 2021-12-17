import { SerializeObject } from '@core/common';
import { AutoMap } from '@nartc/automapper';

export class CvRequest {
	@SerializeObject({
		nullable: true,
		optional: true,
		name: 'employee_id_list',
	})
	@AutoMap()
	public employeeIdList?: number[] | null;
}
