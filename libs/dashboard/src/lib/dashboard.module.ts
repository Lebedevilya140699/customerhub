import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { GridModule } from '@core/grid';

@NgModule({
	imports: [CommonModule, RouterModule, RouterModule, MatGridListModule, GridModule],
	declarations: [DashboardComponent],
})
export class DashboardModule {}
