import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	ContactsComponent,
	SummaryComponent,
	ExperienceComponent,
	SettingsComponent,
	MainComponent,
	SkillsComponent,
	EducationComponent,
	CertificatesComponent,
} from '@core/settings';

const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'main',
			},
			{
				path: 'main',
				component: MainComponent,
			},
			{
				path: 'contacts',
				component: ContactsComponent,
			},

			{
				path: 'experience',
				component: ExperienceComponent,
			},
			{
				path: 'summary',
				component: SummaryComponent,
			},
			{
				path: 'skills',
				component: SkillsComponent,
			},
			{
				path: 'education',
				component: EducationComponent,
			},
			{
				path: 'certificates',
				component: CertificatesComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SettingsRoutingModule {}
