import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './components/grid/grid.component';
import { ColumnComponent } from './components/column/column.component';
import { BlockComponent } from './components/block/block.component';

@NgModule({
	imports: [CommonModule],
	declarations: [GridComponent, ColumnComponent, BlockComponent],
	exports: [GridComponent, ColumnComponent, BlockComponent],
})
export class GridModule {}
