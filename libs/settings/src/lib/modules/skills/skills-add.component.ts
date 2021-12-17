import { Component } from '@angular/core';
import { CurtainRef } from '@core/curtain';
import { SettingsFacade } from '../../+state/settings.facade';
import { FormComponent, FormValidator } from '@core/common';
import { SettingsReducer } from '../../+state/settings.reducer';
import { ResumeForm } from '@core/platform';
import { SettingsAction } from '../../+state/settings.actions';
import { take } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
	selector: 'hh-skills-add',
	templateUrl: './skills-add.component.html',
})
export class SkillsAddComponent extends FormComponent<
	SettingsReducer.SettingsPartialState,
	ResumeForm,
	SettingsAction.SettingsActions,
	SettingsAction,
	SettingsFacade
> {
	selectable = true;
	removable = true;
	addOnBlur = true;

	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	skills: string[] = [];

	constructor(
		formFacade: SettingsFacade,
		validator: FormValidator,
		public readonly curtain: CurtainRef,
		public readonly facade: SettingsFacade
	) {
		super(formFacade, validator);
	}

	public save() {
		this.formIsInvalidAsync$.pipe(take(1)).subscribe((x) => {
			if (x) return;

			this.curtain.close();
		});
	}

	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		if (value) {
			this.skills.push(value);
		}

		event.chipInput!.clear();
	}

	remove(skill: string): void {
		const index = this.skills.indexOf(skill);

		if (index >= 0) {
			this.skills.splice(index, 1);
		}
	}
}
