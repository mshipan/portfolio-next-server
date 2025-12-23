import { User } from "@prisma/client";
export declare const createUserToken: (user: Partial<User>) => {
    accessToken: string;
    refreshToken: string;
};
export declare const createNewAccessTokenWithRefreshToken: (refreshToken: string) => Promise<string>;
//# sourceMappingURL=userToken.d.ts.map