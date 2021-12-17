import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TasksComponent, TaskViewComponent } from '@core/tasks';

const routes: Routes = [
	{
		path: '',
		component: TasksComponent,
	},
	{
		path: 'task/:id',
		component: TaskViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TasksRoutingModule {}
