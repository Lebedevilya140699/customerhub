import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule as _ProfileModule } from '@core/profile';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, ProfileRoutingModule, _ProfileModule],
})
export class ProfileModule {}
