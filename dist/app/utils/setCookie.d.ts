import { Response } from "express";
interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}
export declare const setAuthCookie: (res: Response, tokenInfo: AuthTokens) => void;
export {};
//# sourceMappingURL=setCookie.d.ts.map