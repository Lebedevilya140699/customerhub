import { NgModule } from '@angular/core';
import { EmployeesRoutingModule } from './employees-routing.module';
import { CommonModule } from '@angular/common';
import { EmployeesModule as _EmployeesModule } from '@core/employees';

@NgModule({
	declarations: [],
	imports: [CommonModule, EmployeesRoutingModule, _EmployeesModule],
})
export class EmployeesModule {}
