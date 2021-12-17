export interface Navigation {
	path: string;
	code: string;
	icon: string;
	id: number;
}

export interface INavigationState {
	history: Navigation[];
	counter: number;
	filter?: RegExp;
}
