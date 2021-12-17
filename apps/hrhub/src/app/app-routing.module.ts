import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedLayoutComponent, ForbiddenComponent, ServerErrorComponent } from '@core/layout';
import { PrivateContainer } from './containers/private.container';
import { SessionGuard } from '@core/session';
import { NotFoundComponent } from '@core/layout';

const routes: Routes = [
	{
		path: '',
		component: PrivateContainer,
		canActivateChild: [SessionGuard],
		canActivate: [SessionGuard],
		children: [
			{
				path: '',
				component: AuthorizedLayoutComponent,
				children: [
					{
						path: '',
						pathMatch: 'full',
						redirectTo: 'dashboard',
					},
					{
						path: 'dashboard',
						loadChildren: () =>
							import('./modules/dashboard/dashboard.module').then(
								(m) => m.DashboardModule
							),
					},
					{
						path: 'employees',
						loadChildren: () =>
							import('./modules/employees/employees.module').then(
								(m) => m.EmployeesModule
							),
					},
					{
						path: 'tasks',
						loadChildren: () =>
							import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
					},
					{
						path: 'profile/:id',
						loadChildren: () =>
							import('./modules/profile/profile.module').then((m) => m.ProfileModule),
					},
					{
						path: 'settings',
						loadChildren: () =>
							import('./modules/settings/settings.module').then(
								(m) => m.SettingsModule
							),
					},
					{
						path: '404',
						component: NotFoundComponent,
					},
					{
						path: '403',
						component: ForbiddenComponent,
					},
					{
						path: '503',
						component: ServerErrorComponent,
					},
				],
			},
		],
	},
	{
		path: 'auth',
		loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: '**',
		redirectTo: '404',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
