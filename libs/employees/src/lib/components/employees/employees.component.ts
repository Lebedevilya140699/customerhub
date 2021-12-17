import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { IBreadcrumbs } from '@core/breadcrumbs';
import { EmployeesFacade } from '../../+state/employees.facade';
import { UserCollectionService } from '@core/user';
import { Observable, fromEvent } from 'rxjs';
import { User } from '@core/domain';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EmployeesAction } from '../../+state/employees.actions';
import { EmployeesReducer } from '../../+state/employees.reducer';

@Component({
	selector: 'hh-employees',
	templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnDestroy, AfterViewInit {
	@ViewChild('searchInput', { static: true })
	searchInput: ElementRef<HTMLInputElement> | null = null;

	public searchTerm = '';
	public breadcrumbs: IBreadcrumbs[] = [
		{
			displayValue: 'Dashboard',
			leading: false,
			route: '/dashboard',
		},
		{
			displayValue: 'Employees',
			leading: true,
		},
	];

	public users$: Observable<User[]>;
	public isLoading$: Observable<boolean>;
	public items: any[] = [];
	public isChecked = false;
	public isDownloading = false;

	constructor(
		private readonly facade: EmployeesFacade,
		private readonly userCollectionService: UserCollectionService,
		private readonly store: Store<EmployeesReducer.EmployeesPartialState>
	) {
		this.users$ = this.facade.ids$.pipe(
			switchMap((ids: number[]) => this.userCollectionService.users(ids))
		);
		this.isLoading$ = this.facade.isLoading$;
	}

	public ngAfterViewInit() {
		if (this.searchInput) {
			fromEvent<Event>(this.searchInput.nativeElement, 'keyup')
				.pipe(
					map((event) => {
						return (event.target as HTMLInputElement).value;
					}),
					filter((res) => res.length >= 3 || res.length === 0),
					debounceTime(1000),
					distinctUntilChanged()
				)
				.subscribe((searchTerm) => {
					this.store.dispatch(EmployeesAction.search({ payload: searchTerm }));
				});
		}
	}

	public clearSearch() {
		if (this.searchInput) {
			this.store.dispatch(EmployeesAction.search({ payload: '' }));
		}
	}

	addItem(newItem: string) {
		this.isChecked = true;
		this.items.push(newItem);
	}

	removeItem(newItem: string) {
		let id = this.items.indexOf(newItem);
		this.items.splice(id, 1);
		if (this.items.length == 0) {
			this.isChecked = false;
		}
	}

	downloadCv() {
		this.isDownloading = true;
		this.facade.downloadUserCv(this.items);
		this.facade.isDownloadedUserCv().subscribe((data) => {
			if (data === true) {
				this.isDownloading = false;
				this.isChecked = false;
				this.items = [];
			}
		});
	}

	public ngOnDestroy() {
		this.facade.reset();
	}
}
