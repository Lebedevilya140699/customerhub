import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	constructor(private http: HttpClient) {}

	downloadFile(id: string): Observable<Blob> {
		return this.http.get(`http://10.86.1.74:8081/hr/api/v1/cv/docx?employee_id=${id}`, {
			responseType: 'blob',
		});
	}
}
