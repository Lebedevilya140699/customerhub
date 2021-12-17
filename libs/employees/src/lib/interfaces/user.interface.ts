import { IEducation } from './education.interface';
import { ILocation } from './location.interface';
import { IManager } from './manager.interface';
import { IVisa } from './visa.interface';

export interface IUser {
	personal_info: {
		id: number;
		first_name: string;
		last_name: string;
		contact_info: {
			email: string;
			linkedin: string;
			phone: string;
		} | null;
		date_of_birth: Date;
		education: IEducation[];
		location: ILocation;
		manager: IManager;
		photo: string | null;
		role: string;
		summary: string;
		position: string;
		title: string;
		visas: IVisa[];
		educations: IEducation[];
	};
}
