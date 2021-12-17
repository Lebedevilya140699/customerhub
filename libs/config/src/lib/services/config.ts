import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Config<TConfig> extends BehaviorSubject<TConfig | null> implements OnDestroy {
	constructor() {
		super(null);
	}

	public complete(): void {
		// Do nothing
	}

	public ngOnDestroy(): void {
		super.complete();
	}
}
