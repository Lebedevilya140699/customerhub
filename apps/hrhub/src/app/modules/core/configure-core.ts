import { CoreLibModuleBuilder } from '@core/core-lib';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../../environments/environment';
import { HttpMethod, ResponseType } from '@core/common';
import {
	CvRequest,
	LoginRequest,
	LoginResponse,
	ResumeRequest,
	ResumeResponse,
	TaskResponse,
	UserResponse,
	UsersResponse,
} from '@core/platform';
import { UserEndpoints } from '@core/user';
import { AuthEndpoints } from '@core/auth';
import { EmployeeEndpoints } from '@core/employees';
import { ProfileEndpoints } from '@core/profile';
import { TasksEndpoints } from '@core/tasks';

export function configureCore(): (builder: CoreLibModuleBuilder) => void {
	return (builder: CoreLibModuleBuilder) => {
		builder
			.withEndpoint(AuthEndpoints.CHECK_PASSWORD, (endpoint) => {
				endpoint.pathFormat = environment.endpoints[AuthEndpoints.CHECK_PASSWORD];
				endpoint.request = LoginRequest;
				endpoint.httpMethod = HttpMethod.POST;
				endpoint.response = LoginResponse;
			})
			.withEndpoint(UserEndpoints.GET, (endpoint) => {
				endpoint.pathFormat = environment.endpoints[UserEndpoints.GET];
				endpoint.httpMethod = HttpMethod.GET;
				endpoint.response = UserResponse;
			})
			.withEndpoint(UserEndpoints.GET_CV, (endpoint) => {
				endpoint.pathFormat = environment.endpoints[UserEndpoints.GET_CV];
				endpoint.httpMethod = HttpMethod.GET;
				endpoint.response = ResumeResponse;
			})
			.withEndpoint(UserEndpoints.GET_ALL, (endpoint) => {
				endpoint.pathFormat = environment.endpoints[UserEndpoints.GET_ALL];
				endpoint.httpMethod = HttpMethod.GET;
				endpoint.response = UsersResponse;
			})
			.withEndpoint(UserEndpoints.SEARCH, (endpoint) => {
				endpoint.pathFormat = environment.endpoints[UserEndpoints.SEARCH];
				endpoint.httpMethod = HttpMethod.GET;
				endpoint.response = UsersResponse;
			})
			.withEndpoint(UserEndpoints.UPDATE, (endpoint) => {
				endpoint.pathFormat = environment.endpoints[UserEndpoints.UPDATE];
				endpoint.httpMethod = HttpMethod.POST;
				endpoint.request = ResumeRequest;
				endpoint.response = ResumeResponse;
			})
			.withEndpoint(ProfileEndpoints.DOWNLOAD, (endpoint) => {
				endpoint.pathFormat = environment.endpoints[ProfileEndpoints.DOWNLOAD];
				endpoint.httpMethod = HttpMethod.GET;
				endpoint.responseType = ResponseType.BLOB;
			})
			.withEndpoint(EmployeeEndpoints.DOWNLOAD, (endpoint) => {
				endpoint.pathFormat = environment.endpoints[EmployeeEndpoints.DOWNLOAD];
				endpoint.httpMethod = HttpMethod.POST;
				endpoint.request = CvRequest;
				endpoint.responseType = ResponseType.BLOB;
			})
			.withEndpoint(TasksEndpoints.LOAD_TASKS, (endpoint) => {
				endpoint.pathFormat = environment.endpoints[TasksEndpoints.LOAD_TASKS];
				endpoint.httpMethod = HttpMethod.GET;
				endpoint.response = TaskResponse;
			})
			.withEndpoint(UserEndpoints.APPROVE_CV, (endpoint) => {
				endpoint.pathFormat = environment.endpoints[UserEndpoints.APPROVE_CV];
				endpoint.httpMethod = HttpMethod.PUT;
				endpoint.responseType = ResponseType.JSON;
			})
			.withStorage(LocalStorageService);
	};
}
