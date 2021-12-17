import { Boxed, unbox, ValidationErrors } from 'ngrx-forms';

// @ts-ignore eslint-disable-next-line max-len
export const LINK_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export function link<T extends string | Boxed<string> | null | undefined>(
	value: T
): ValidationErrors {
	value = (unbox(value) as string | null | undefined) as T;

	if (value === null || value === undefined || (value as string).length === 0) {
		return {};
	}

	if (LINK_REGEXP.test(value as string)) {
		return {};
	}

	return {
		link: {
			pattern: LINK_REGEXP.toString(),
			actual: value as string,
		},
	};
}
