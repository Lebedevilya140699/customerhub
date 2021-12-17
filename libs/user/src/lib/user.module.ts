import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENTITY_METADATA_TOKEN, EntityDataService, EntityServices } from '@ngrx/data';
import { Resume, User } from '@core/domain';
import { UserService } from './services/user.service';
import { UserCollectionService } from './services/user-collection.service';
import { ResumeCollectionService } from './services/resume-collection.service';

@NgModule({
	imports: [CommonModule],
	providers: [UserService, UserCollectionService, ResumeCollectionService],
})
export class UserModule {
	public static forRoot(): ModuleWithProviders<UserModule> {
		return {
			ngModule: UserModule,
			providers: [
				{
					provide: ENTITY_METADATA_TOKEN,
					useValue: {
						User: {
							entityName: 'User',
							selectId: (model: User) => model.id,
						},
						Resume: {
							entityName: 'Resume',
							selectId: (model: Resume) => model.employeeId,
						},
					},
					multi: true,
				},
			],
		};
	}

	constructor(
		entityDataService: EntityDataService,
		entityServices: EntityServices,
		userService: UserService,
		userCollectionService: UserCollectionService,
		resumeCollectionService: ResumeCollectionService
	) {
		entityDataService.registerServices({
			User: userService,
		});
		entityServices.registerEntityCollectionServices({
			User: userCollectionService,
			Resume: resumeCollectionService,
		});
	}
}
