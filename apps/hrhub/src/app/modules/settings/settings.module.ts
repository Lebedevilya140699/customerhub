import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsModule as _SettingsModule } from '@core/settings';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, SettingsRoutingModule, _SettingsModule],
})
export class SettingsModule {}
