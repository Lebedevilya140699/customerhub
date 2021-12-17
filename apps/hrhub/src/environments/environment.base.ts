// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthenticationScheme, HttpHeaderKey, IEnvironment } from '@core/common';

export const environmentBase: IEnvironment = {
	production: false,
	application: 'HRHub',
	apiUrl: '/api',
	authorizationMethod: AuthenticationScheme.Bearer,
	authorizationKey: HttpHeaderKey.Authorization,
	accessTokenKey: 'access',
	loginUrl: '/auth/login',
	logoutUrl: '/403',
	endpoints: {
		'api/user/GET': 'hr/api/v1/info/{0}',
		'api/user/GET_CV': 'hr/api/v1/cv/employee/{0}',
		'api/user/GET_ALL': 'hr/api/v1/info',
		'api/user/SEARCH': 'hr/api/v1/info/search',
		'api/user/UPDATE': 'hr/api/v1/cv',
		'api/auth/CHECK_PASSWORD': 'hr/api/v1/authentication/login',
		'api/profile/DOWNLOAD': 'hr/api/v1/cv/docx?employee_id={0}',
		'api/employee/DOWNLOAD': 'hr/api/v1/cv/zip',
		'api/tasks/LOAD_TASKS': 'hr/api/v1/tasks',
		'api/user/APPROVE_CV': 'hr/api/v1/cv/approve?employee_id={0}',
	},
	configUrl: '/config.json',
	rootTitle: 'CTHub',
	tempapiUrl: 'http://10.86.1.74:8081',
};
