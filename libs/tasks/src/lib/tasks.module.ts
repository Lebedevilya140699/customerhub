import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@core/grid';
import { BreadcrumbsModule } from '@core/breadcrumbs';
import { MatIconModule } from '@angular/material/icon';
import { CardModule } from '@core/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipFilterModule } from '@core/tooltip-filter';
import { ENTITY_METADATA_TOKEN, EntityDataService, EntityServices } from '@ngrx/data';
import { Task } from '@core/domain';
import { TasksService } from './services/tasks.service';
import { TasksCollectionService } from './services/tasks-collection.service';
import { StoreModule } from '@ngrx/store';
import { TasksReducer } from './+state/tasks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffect } from './+state/tasks.effect';
import { ReactiveComponentModule } from '@ngrx/component';
import { TasksFacade } from './+state/tasks.facade';
import { TasksComponent } from './components/tasks/tasks.component';
import { RouterModule } from '@angular/router';
import { TaskViewComponent } from './components/tasks-view/task-view.component';
import { ProfileModule } from '@core/profile';

@NgModule({
	imports: [
		CommonModule,
		GridModule,
		BreadcrumbsModule,
		MatIconModule,
		CardModule,
		TooltipFilterModule,
		MatTooltipModule,
		StoreModule.forFeature(TasksReducer.TASKS_FEATURE_KEY, TasksReducer.reducer, {
			initialState: TasksReducer.initialState,
		}),
		EffectsModule.forFeature([TasksEffect]),
		ReactiveComponentModule,
		RouterModule,
		ProfileModule,
	],
	declarations: [TasksComponent, TaskViewComponent],
	exports: [TasksComponent, TaskViewComponent],
	providers: [TasksService, TasksCollectionService, TasksFacade],
})
export class TasksModule {
	constructor(
		entityDataService: EntityDataService,
		entityServices: EntityServices,
		tasksService: TasksService,
		tasksCollectionService: TasksCollectionService
	) {
		entityDataService.registerServices({
			Tasks: tasksService,
		});
		entityServices.registerEntityCollectionServices({
			Tasks: tasksCollectionService,
		});
	}

	public static forRoot(): ModuleWithProviders<TasksModule> {
		return {
			ngModule: TasksModule,
			providers: [
				{
					provide: ENTITY_METADATA_TOKEN,
					useValue: {
						Tasks: {
							entityName: 'Tasks',
							selectId: (model: Task) => model.id,
						},
					},
					multi: true,
				},
			],
		};
	}
}
