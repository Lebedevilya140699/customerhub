import { EmployeeStatusEnum } from '../enums/employee-status.enum';
import { Location } from '@core/domain';

export interface IEmployeeCardProps {
	id: number;
	firstName: string;
	lastName: string;
	position: string;
	avatar: string | null;
	location: Location;
	status: EmployeeStatusEnum;
}
