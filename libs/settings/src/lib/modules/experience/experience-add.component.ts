import { Component } from '@angular/core';
import { CurtainRef } from '@core/curtain';
import { ExperienceFormFacade } from './+state/experience-form.facade';
import { FormComponent, FormValidator } from '@core/common';
import { ExperienceFormReducer } from './+state/experience-form.reducer';
import { ExperienceForm } from '@core/platform';
import { ExperienceFormAction } from './+state/experience-form.actions';
import { take } from 'rxjs/operators';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { NgrxValueConverters } from 'ngrx-forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
	selector: 'hh-experience-add',
	templateUrl: './experience-add.component.html',
})
export class ExperienceAddComponent extends FormComponent<
	ExperienceFormReducer.ExperienceFormPartialState,
	ExperienceForm,
	ExperienceFormAction.ExperienceFormActions,
	ExperienceFormAction,
	ExperienceFormFacade
> {
	public readonly dateValueConverter = NgrxValueConverters.dateToISOString;
	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	public maxDate = new Date();
	public skills: string[] = [];

	constructor(
		formFacade: ExperienceFormFacade,
		validator: FormValidator,
		public readonly curtain: CurtainRef
	) {
		super(formFacade, validator);
	}

	remove(skill: string): void {
		const index = this.skills.indexOf(skill);

		if (index >= 0) {
			this.skills.splice(index, 1);
		}
	}

	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		if (value) {
			this.skills.push(value);
		}

		event.chipInput!.clear();
	}

	public save() {
		this.formIsInvalidAsync$.pipe(take(1)).subscribe((x) => {
			if (x) return;

			this.curtain.close();
		});
	}
}
