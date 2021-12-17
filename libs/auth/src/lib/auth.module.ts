import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { GridModule } from '@core/grid';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { AuthService } from './services';
import { EffectsModule } from '@ngrx/effects';
import { NgrxFormsModule } from 'ngrx-forms';
import { AuthFacade } from './+state/auth.facade';
import { FormValidator } from '@core/common';
import { AuthValidator } from './helpers/auth-validator';

@NgModule({
	imports: [
		CommonModule,
		GridModule,
		MatFormFieldModule,
		MatInputModule,
		MatDividerModule,
		MatButtonModule,
		RouterModule,
		NgrxFormsModule,
		StoreModule.forFeature(AuthReducer.AUTH_FEATURE_KEY, AuthReducer.reducer, {
			initialState: AuthReducer.initialState,
		}),
		EffectsModule.forFeature([AuthEffects]),
	],
	providers: [
		AuthFacade,
		AuthService,
		{
			provide: FormValidator,
			useClass: AuthValidator,
		},
	],
	declarations: [LoginComponent],
})
export class AuthModule {}
