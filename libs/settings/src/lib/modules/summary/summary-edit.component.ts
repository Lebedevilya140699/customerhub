import { Component } from '@angular/core';
import { CurtainRef } from '@core/curtain';
import { SettingsFacade } from '../../+state/settings.facade';
import { filterNil, FormComponent, FormValidator, Map, takeNotNil } from '@core/common';
import { SettingsReducer } from '../../+state/settings.reducer';
import { ResumeForm } from '@core/platform';
import { SettingsAction } from '../../+state/settings.actions';
import { mergeMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '@core/domain';
import { UserCollectionService } from '@core/user';
import { SessionFacade } from '@core/session';
import { NgrxValueConverters } from 'ngrx-forms';

@Component({
	selector: 'hh-main-edit',
	templateUrl: './summary-edit.component.html',
})
export class SummaryEditComponent extends FormComponent<
	SettingsReducer.SettingsPartialState,
	ResumeForm,
	SettingsAction.SettingsActions,
	SettingsAction,
	SettingsFacade
> {
	public readonly currentUser$: Observable<User | null>;
	public readonly resumeForm$: Observable<ResumeForm | null>;
	public readonly dateValueConverter = NgrxValueConverters.dateToISOString;

	constructor(
		formFacade: SettingsFacade,
		validator: FormValidator,
		public readonly curtain: CurtainRef,
		public readonly facade: SettingsFacade,
		private readonly session: SessionFacade,
		private readonly userCollectionService: UserCollectionService
	) {
		super(formFacade, validator);

		this.currentUser$ = this.session.userId$.pipe(
			filterNil,
			mergeMap((userId: number | null) => this.userCollectionService.user(userId!)),
			filterNil
		);

		this.resumeForm$ = this.currentUser$.pipe(takeNotNil(1), Map(ResumeForm, User));
	}

	public save() {
		this.formIsInvalidAsync$.pipe(take(1)).subscribe((x) => {
			if (x) return;

			this.curtain.close();
		});
	}
}
