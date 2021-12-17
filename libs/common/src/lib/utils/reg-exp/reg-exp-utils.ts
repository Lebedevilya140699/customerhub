/**
 * Regular expressions
 */
export class RegExpUtils {
	/**
	 * Regexp for jwt token {@link https://www.regextester.com/105777}
	 */
	public static JWT_TOKEN_REGEXP: RegExp = new RegExp(
		/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
	);
}
