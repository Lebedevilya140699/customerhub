import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksModule as _TasksModule } from '@core/tasks';

@NgModule({
	imports: [CommonModule, TasksRoutingModule, _TasksModule.forRoot()],
})
export class TasksModule {}
