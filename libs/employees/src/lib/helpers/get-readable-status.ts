import { EmployeeStatusEnum } from '../enums/employee-status.enum';

export const getReadableStatus = (status: EmployeeStatusEnum) => {
	const map: Record<EmployeeStatusEnum, string> = {
		[EmployeeStatusEnum.Busy]: EmployeeStatusEnum.Busy,
		[EmployeeStatusEnum.Available]: EmployeeStatusEnum.Available,
	};

	return map[status];
};
