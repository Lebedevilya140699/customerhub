import { User } from '@core/domain';
import { ResumeForm } from '@core/platform';

export class UserWithForm {
	public user?: User;
	public form?: ResumeForm;
}
