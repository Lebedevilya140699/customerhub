import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipFilterComponent } from './components/tooltip-filter.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	imports: [CommonModule, MatTooltipModule, MatIconModule],
	declarations: [TooltipFilterComponent],
	exports: [TooltipFilterComponent],
})
export class TooltipFilterModule {}
