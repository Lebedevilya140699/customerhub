import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EntityDataModule } from '@ngrx/data';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrivateContainer } from './containers/private.container';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core/core.module';

@NgModule({
	declarations: [AppComponent, PrivateContainer],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		CoreModule.forRoot(),
		EntityDataModule.forRoot({}),
		BrowserAnimationsModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
