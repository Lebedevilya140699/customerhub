import { Component, Input } from '@angular/core';
import { Experience } from '@core/domain';

@Component({
	selector: 'hh-project-experience',
	templateUrl: './project-experience.component.html',
})
export class ProjectExperienceComponent {
	@Input() experience: Experience[] = [];
}
