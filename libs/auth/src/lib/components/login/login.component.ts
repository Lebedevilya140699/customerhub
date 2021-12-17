import { Component, HostBinding } from '@angular/core';
import { SessionFacade } from '@core/session';
import { FormComponent, FormValidator } from '@core/common';
import { AuthReducer } from '../../+state/auth.reducer';
import { AuthForm } from '@core/platform';
import { AuthAction } from '../../+state/auth.action';
import { AuthFacade } from '../../+state/auth.facade';
import { take } from 'rxjs/operators';

@Component({
	selector: 'hh-login',
	templateUrl: './login.component.html',
})
export class LoginComponent extends FormComponent<
	AuthReducer.AuthReducerPartialState,
	AuthForm,
	AuthAction.AuthActions,
	AuthAction,
	AuthFacade
> {
	@HostBinding('class') class = 'hh--login';

	public isError = false;

	constructor(
		formFacade: AuthFacade,
		formValidator: FormValidator,
		readonly session: SessionFacade
	) {
		super(formFacade, formValidator);
	}

	public submitForm(): void {
		this.formFacade
			.submitLoginForm()
			.pipe(take(1))
			.subscribe({
				error: () => {
					this.setError(true);
				},
			});
	}

	public setError(value: boolean): void {
		this.isError = value;
	}
}
