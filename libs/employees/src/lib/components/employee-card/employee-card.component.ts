import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { IEmployeeCardProps } from '../../interfaces/employee-card-props.interface';
import { EmployeeStatusEnum } from '../../enums/employee-status.enum';
import { Location } from '@core/domain';
import { getReadableStatus } from '../../helpers/get-readable-status';
import { EmployeesFacade } from '../../+state/employees.facade';

@Component({
	selector: 'hh-employee-card',
	templateUrl: './employee-card.component.html',
})
export class EmployeeCardComponent implements IEmployeeCardProps, OnInit {
	@Input() public id = 0;
	@Input() public firstName = '';
	@Input() public lastName = '';
	@Input() public position = '';
	@Input() public avatar = null;
	@Input() public location: Location = {};
	@Input() public status = EmployeeStatusEnum.Busy;
	@Output() addId = new EventEmitter<string>();
	@Output() removeId = new EventEmitter<string>();
	public ids: any[] = [];
	public isChecked = false;
	public isUncheck = false;

	constructor(private readonly facade: EmployeesFacade) {}

	ngOnInit(): void {
		this.facade.isDownloadedUserCv().subscribe((data) => {
			if (data === true) {
				this.isUncheck = false;
				this.isChecked = false;
			}
		});
	}

	public get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	public get isBusy() {
		return this.status === EmployeeStatusEnum.Busy;
	}

	public get isAvailable() {
		return this.status === EmployeeStatusEnum.Available;
	}

	public get link() {
		return `/profile/${this.id}/`;
	}

	public get readableStatus() {
		return getReadableStatus(this.status);
	}

	exportCV(event: any, id: any) {
		if (event.checked) {
			this.addId.emit(id);
			this.isChecked = true;
		} else {
			this.removeId.emit(id);
			this.isChecked = false;
		}
	}
}
