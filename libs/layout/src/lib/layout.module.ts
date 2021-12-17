import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule as _CommonModule } from '@angular/common';
import { CommonModule } from '@core/common';
import { AuthorizedLayoutComponent } from './components/authorized-layout/authorized-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ILayoutOptions } from './interfaces/layout-options';
import { NAVIGATION } from './tokens/navigation';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GridModule } from '@core/grid';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideModule } from 'ng-click-outside';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

@NgModule({
	imports: [
		_CommonModule,
		CommonModule,
		RouterModule,
		MatToolbarModule,
		GridModule,
		MatIconModule,
		ClickOutsideModule,
		ReactiveComponentModule,
	],
	declarations: [
		AuthorizedLayoutComponent,
		HeaderComponent,
		NavigationComponent,
		AuthLayoutComponent,
		NotFoundComponent,
		ForbiddenComponent,
		ServerErrorComponent,
	],
	exports: [HeaderComponent, NotFoundComponent, ForbiddenComponent, ServerErrorComponent],
})
export class LayoutModule {
	public static forRoot(options?: ILayoutOptions): ModuleWithProviders<LayoutModule> {
		return {
			ngModule: LayoutModule,
			providers: [
				{
					provide: NAVIGATION,
					useValue: options?.items ?? [],
					multi: false,
				},
			],
		};
	}
}
