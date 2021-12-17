import { ILoadable, Token } from '@core/common';

export interface ISessionState extends ILoadable {
	tokenPayload: Token | null;
	token: string | null;
}
