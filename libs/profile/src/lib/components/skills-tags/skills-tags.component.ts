import { Component, Input } from '@angular/core';
import { Certificate, Skills } from '@core/domain';

@Component({
	selector: 'hh-skills-tags',
	templateUrl: './skills-tags.component.html',
})
export class SkillsTagsComponent {
	@Input() skills: Skills[] = [];
	@Input() certificates: Certificate[] = [];

	constructor() {}

	public get formattedSkills() {
		return this.skills.reduce<string[]>((acc, skill) => {
			if (skill.skills) {
				return [...acc, ...skill.skills];
			}
			return [...acc];
		}, []);
	}
}
