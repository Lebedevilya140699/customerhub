import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Resume, User } from '@core/domain';
import { CurtainService } from '@core/curtain';
import { ContactsEditComponent } from './contacts-edit.component';
import { ContactsAddComponent } from './contacts-add.component';
import { filterNil, Map } from '@core/common';
import { mergeMap } from 'rxjs/operators';
import { SessionFacade } from '@core/session';
import { ResumeCollectionService } from '@core/user';
import { LinksFormFacade } from './+state/links-form.facade';
import { ContactsForm } from '@core/platform';
import { ContactsFormFacade } from './+state/contacts-form.facade';
import { TitleService } from '../../../../../core-lib/src/lib/services/title.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'hh-contacts',
	templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {
	public readonly resume$: Observable<Resume>;
	private sub: Subscription = Subscription.EMPTY;

	constructor(
		private readonly curtain: CurtainService,
		private readonly session: SessionFacade,
		private readonly titleService: Title,
		public readonly linksFacade: LinksFormFacade,
		public readonly contactsFormFacade: ContactsFormFacade,
		private readonly resumeCollectionService: ResumeCollectionService
	) {
		this.resume$ = this.session.userId$.pipe(
			filterNil,
			mergeMap((userId: number | null) => this.resumeCollectionService.resume(userId!)),
			filterNil
		);

		this.sub = this.resume$.pipe(Map(ContactsForm, Resume)).subscribe((form: ContactsForm) => {
			this.contactsFormFacade.updateFormControl({
				value: form.phone,
				name: 'phone',
			});
			this.contactsFormFacade.updateFormControl({
				value: form.email,
				name: 'email',
			});
		});
	}

	ngOnInit() {
		this.titleService.setTitle('Contacts');
	}

	triggerEdit(): void {
		this.curtain.open(ContactsEditComponent);
	}

	triggerAdd(): void {
		this.curtain.open(ContactsAddComponent);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
