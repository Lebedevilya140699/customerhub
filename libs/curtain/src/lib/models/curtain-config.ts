import { OverlayConfig } from '@angular/cdk/overlay';

export class CurtainConfig extends OverlayConfig {
	public readonly handleBackdrop: boolean = false;
	public readonly isClosable: boolean = true;

	constructor(config: Partial<CurtainConfig>) {
		super(config);
		this.handleBackdrop = config.handleBackdrop ?? false;
		this.isClosable = config.isClosable ?? true;
	}
}
