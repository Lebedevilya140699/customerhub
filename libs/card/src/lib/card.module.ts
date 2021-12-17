import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { MatIconModule } from '@angular/material/icon';
import { TooltipFilterModule } from '@core/tooltip-filter';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [CommonModule, MatIconModule, TooltipFilterModule, RouterModule],
	declarations: [TaskCardComponent],
	exports: [TaskCardComponent],
})
export class CardModule {}
