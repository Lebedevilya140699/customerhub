import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { GridModule } from '@core/grid';
import { ProfileComponent } from './components/profile/profile.component';
import { StatusTagsComponent } from '../../../cv/src/lib/components/status-tags.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BreadcrumbsModule } from '@core/breadcrumbs';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileReducer } from './+state/profile.reducer';
import { ProfileEffects } from './+state/profile.effects';
import { SkillsTagsComponent } from './components/skills-tags/skills-tags.component';
import { ProjectExperienceComponent } from './components/experience/project-experience.component';
import { ProfileFacade } from './+state/profile.facade';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';

@NgModule({
	imports: [
		CommonModule,
		GridModule,
		MatChipsModule,
		MatIconModule,
		QRCodeModule,
		RouterModule,
		StoreModule.forFeature(ProfileReducer.PROFILE_FEATURE_KEY, ProfileReducer.reducer, {
			initialState: ProfileReducer.initialState,
		}),
		EffectsModule.forFeature([ProfileEffects]),
		BreadcrumbsModule,
		ReactiveComponentModule,
		MatMenuModule,
		MatProgressSpinnerModule,
	],
	declarations: [
		ProfileComponent,
		PersonalInfoComponent,
		StatusTagsComponent,
		ProjectExperienceComponent,
		ProfileSummaryComponent,
		SkillsTagsComponent,
	],
	exports: [SkillsTagsComponent, ProfileComponent, PersonalInfoComponent],
	providers: [ProfileFacade],
})
export class ProfileModule {}
