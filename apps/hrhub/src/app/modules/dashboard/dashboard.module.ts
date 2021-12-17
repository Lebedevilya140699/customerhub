import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { DashboardModule as _DashboardModule } from '@core/dashboard';

@NgModule({
	declarations: [],
	imports: [CommonModule, DashboardRoutingModule, _DashboardModule],
})
export class DashboardModule {}
