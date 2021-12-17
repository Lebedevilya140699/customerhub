import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthModule as _AuthModule } from '@core/auth';

@NgModule({
	declarations: [],
	imports: [CommonModule, AuthRoutingModule, _AuthModule],
})
export class AuthModule {}
