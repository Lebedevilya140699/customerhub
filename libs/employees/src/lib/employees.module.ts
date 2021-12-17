import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@core/common';
import { GridModule } from '@core/grid';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeesEffects } from './+state/employees.effects';
import { EmployeesReducer } from './+state/employees.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbsModule } from '@core/breadcrumbs';
import { EmployeesFacade } from './+state/employees.facade';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
	imports: [
		AngularCommonModule,
		CommonModule,
		GridModule,
		MatIconModule,
		MatInputModule,
		FormsModule,
		BreadcrumbsModule,
		HttpClientModule,
		StoreModule.forFeature(EmployeesReducer.EMPLOYEES_FEATURE_KEY, EmployeesReducer.reducer, {
			initialState: EmployeesReducer.initialState,
		}),
		EffectsModule.forFeature([EmployeesEffects]),
		RouterModule,
		MatProgressSpinnerModule,
		MatButtonModule,
		ReactiveComponentModule,
		MatCheckboxModule,
		MatExpansionModule,
	],
	declarations: [EmployeesComponent, EmployeeCardComponent],
	providers: [EmployeesFacade],
})
export class EmployeesModule {}
