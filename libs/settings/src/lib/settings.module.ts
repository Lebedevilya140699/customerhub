import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { GridModule } from '@core/grid';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import localeRu from '@angular/common/locales/ru';
import { ReactiveComponentModule } from '@ngrx/component';
import { BreadcrumbsModule } from '@core/breadcrumbs';
import { CurtainModule } from '@core/curtain';
import { NgrxFormsModule } from 'ngrx-forms';
import { SettingsFacade } from './+state/settings.facade';
import { StoreModule } from '@ngrx/store';
import { SettingsReducer } from './+state/settings.reducer';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
	MatNativeDateModule,
} from '@angular/material/core';
import {
	MAT_MOMENT_DATE_ADAPTER_OPTIONS,
	MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { EffectsModule } from '@ngrx/effects';
import { ProfileModule } from '@core/profile';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContactsEditComponent } from './modules/contacts/contacts-edit.component';
import { CertificatesComponent } from './modules/certificates/certificates.component';
import { CertificatesAddComponent } from './modules/certificates/certificates-add.component';
import { SummaryEditComponent } from './modules/summary/summary-edit.component';
import { ContactsAddComponent } from './modules/contacts/contacts-add.component';
import { MainComponent } from './modules/main/main.component';
import { ExperienceAddComponent } from './modules/experience/experience-add.component';
import { SettingsComponent } from './modules/general/settings.component';
import { ExperienceEditComponent } from './modules/experience/experience-edit.component';
import { ExperienceComponent } from './modules/experience/experience.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { EducationComponent } from './modules/education/education.component';
import { SkillsComponent } from './modules/skills/skills.component';
import { SummaryComponent } from './modules/summary/summary.component';
import { SkillsAddComponent } from './modules/skills/skills-add.component';
import { ContactsFormReducer } from './modules/contacts/+state/contacts-form.reducer';
import { LinksFormReducer } from './modules/contacts/+state/links-form.reducer';
import { LinksFormFacade } from './modules/contacts/+state/links-form.facade';
import { ContactsFormFacade } from './modules/contacts/+state/contacts-form.facade';
import { CommonModule as _CommonModule } from '@core/common';
import { LinksFormEffects } from './modules/contacts/+state/links-form.effects';
import { ContactsFormEffects } from './modules/contacts/+state/contacts-form.effects';
import { CertificateFormFacade } from './modules/certificates/+state/certificates-form.facade';
import { CertificateFormReducer } from './modules/certificates/+state/certificates-form.reducer';
import { CertificateFormEffects } from './modules/certificates/+state/certificates-form.effects';
import { CertificatesEditComponent } from './modules/certificates/certificates-edit.component';
import { ExperienceFormFacade } from './modules/experience/+state/experience-form.facade';

registerLocaleData(localeRu, 'ru');

@NgModule({
	imports: [
		CommonModule,
		_CommonModule,
		GridModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		RouterModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatProgressSpinnerModule,
		ReactiveComponentModule,
		BreadcrumbsModule,
		CurtainModule.forRoot(),
		NgrxFormsModule,
		StoreModule.forFeature(SettingsReducer.SETTINGS_FEATURE_KEY, SettingsReducer.reducer, {
			initialState: SettingsReducer.initialState,
		}),
		StoreModule.forFeature(
			ContactsFormReducer.CONTACTS_FORM_FEATURE_KEY,
			ContactsFormReducer.reducer,
			{
				initialState: ContactsFormReducer.initialState,
			}
		),
		StoreModule.forFeature(LinksFormReducer.LINKS_FORM_FEATURE_KEY, LinksFormReducer.reducer, {
			initialState: LinksFormReducer.initialState,
		}),
		StoreModule.forFeature(
			CertificateFormReducer.CERTIFICATE_FORM_FEATURE_KEY,
			CertificateFormReducer.reducer,
			{
				initialState: CertificateFormReducer.initialState,
			}
		),
		EffectsModule.forFeature([ContactsFormEffects, LinksFormEffects, CertificateFormEffects]),
		ProfileModule,
		MatChipsModule,
		MatMenuModule,
		MatProgressSpinnerModule,
	],
	declarations: [
		SettingsComponent,
		SummaryComponent,
		MainComponent,
		ContactsComponent,
		ExperienceComponent,
		ContactsEditComponent,
		ExperienceEditComponent,
		SummaryEditComponent,
		ExperienceAddComponent,
		ContactsAddComponent,
		SkillsComponent,
		EducationComponent,
		SkillsAddComponent,
		CertificatesComponent,
		CertificatesAddComponent,
		CertificatesEditComponent,
	],
	providers: [
		SettingsFacade,
		LinksFormFacade,
		ContactsFormFacade,
		CertificateFormFacade,
		ExperienceFormFacade,
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
		{
			provide: MAT_DATE_FORMATS,
			useValue: {
				parse: {
					dateInput: 'LL',
				},
				display: {
					dateInput: 'LL',
					monthYearLabel: 'MMM YYYY',
					dateA11yLabel: 'LL',
					monthYearA11yLabel: 'MMMM YYYY',
				},
			},
		},
	],
})
export class SettingsModule {}
