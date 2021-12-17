import { NgModule, Type } from '@angular/core';
import { FormValidator, HandlerService } from './services';
import { FormComponent } from './models';
import { CustomErrorStateMatcherDirective } from './functions';

const DECLARED_EXPORTS: Type<any>[] = [FormComponent, CustomErrorStateMatcherDirective];

@NgModule({
	imports: [],
	declarations: [...DECLARED_EXPORTS],
	exports: [...DECLARED_EXPORTS],
	providers: [HandlerService, FormValidator],
})
export class CommonModule {}
