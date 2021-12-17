/**
 * Interface for environment settings
 */

export interface IEnvironment {
	[key: string]: any;
	readonly production: boolean;
	readonly application: string;
	readonly apiUrl: string;
	readonly authorizationMethod: string;
	readonly authorizationKey: string;
	readonly accessTokenKey: string;
	readonly loginUrl: string;
	readonly logoutUrl: string;
	readonly endpoints: Record<string, string>;
	readonly configUrl: string;
	readonly rootTitle: string;
	readonly tempapiUrl?: string;
}
