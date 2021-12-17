import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	Curtain,
	CurtainButton,
	CurtainContent,
	CurtainFooter,
	CurtainHeader,
	CurtainSubtitle,
	CurtainTitle,
} from './components';
import { _CURTAIN_CONFIG, CURTAIN_CONFIG } from './injection-tokens';
import { CurtainConfig } from './models';
import { CurtainService } from './services/curtain.service';
import { CurtainClose } from './components/curtain-close';
import { MatIconModule } from '@angular/material/icon';

export function configureCurtain(config: CurtainConfig, overlay: Overlay): CurtainConfig {
	const defaultCurtainConfig: Partial<CurtainConfig> = {
		width: 608,
		panelClass: 'hh--curtain__container',
		hasBackdrop: true,
		handleBackdrop: false,
		height: '100vh',
	};
	config = new CurtainConfig({
		...defaultCurtainConfig,
		...config,
	});

	config.scrollStrategy = overlay.scrollStrategies.block();
	config.positionStrategy = overlay.position().global().top('0px').right('0px');

	return config;
}

@NgModule({
	imports: [CommonModule, OverlayModule, MatIconModule],
	providers: [CurtainService],
	declarations: [
		Curtain,
		CurtainContent,
		CurtainFooter,
		CurtainTitle,
		CurtainHeader,
		CurtainButton,
		CurtainClose,
		CurtainSubtitle,
	],
	exports: [
		CurtainContent,
		CurtainFooter,
		CurtainTitle,
		CurtainHeader,
		CurtainButton,
		CurtainClose,
		CurtainSubtitle,
	],
})
export class CurtainModule {
	public static forRoot(curtainConfig?: CurtainConfig): ModuleWithProviders<CurtainModule> {
		return {
			ngModule: CurtainModule,
			providers: [
				{
					provide: CURTAIN_CONFIG,
					useFactory: configureCurtain,
					deps: [_CURTAIN_CONFIG, Overlay],
				},
				{
					provide: _CURTAIN_CONFIG,
					useValue: curtainConfig,
				},
			],
		};
	}
}
