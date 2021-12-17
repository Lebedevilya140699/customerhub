import { IUser } from '../interfaces/user.interface';
import { IEmployeeCardProps } from '../interfaces/employee-card-props.interface';
import { EmployeeStatusEnum } from '../enums/employee-status.enum';

export const mapEmployeeCard = (user: IUser): IEmployeeCardProps => {
	const { id, first_name, last_name, location, title, photo } = user.personal_info;

	return {
		id,
		firstName: first_name,
		lastName: last_name,
		location: {
			city: location.city,
			country: location.country,
		},
		position: title,
		avatar: photo,
		status: EmployeeStatusEnum.Busy,
	};
};
