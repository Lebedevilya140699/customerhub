import { inflate } from 'serialazy';
import { String } from 'typescript-string-operations';
import { Token } from '../../models';
import { NullOrUndefined } from '../../types';
import { RegExpUtils } from '../reg-exp';
import { Null } from '../../interfaces';

/**
 * Utils for jwt tokens
 */
export class JwtUtils {
	/**
	 * Parse jwt payload into {@link Token}
	 * @param token - token string to be parsed
	 */
	public static parseJwtPayload(token: Null<string>): Null<Token> {
		if (!(!!token && this.checkToken(token))) return null;
		try {
			const base64Url: string = token.split('.')[1];
			const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			const jsonPayload: string = decodeURIComponent(
				atob(base64)
					.split('')
					.map((c: string) => {
						return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
					})
					.join('')
			);

			return inflate<Token>(Token, JSON.parse(jsonPayload));
		} catch (e) {
			return null;
		}
	}

	/**
	 * Checks token against [regex pattern]{@link RegExpUtils.JWT_TOKEN_REGEXP}
	 * @param token
	 */
	public static checkToken(token: NullOrUndefined<string>): boolean {
		return (
			!!token && !String.IsNullOrWhiteSpace(token) && RegExpUtils.JWT_TOKEN_REGEXP.test(token)
		);
	}
}
