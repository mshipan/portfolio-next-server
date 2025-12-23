import { LoginPayload } from "../../interfaces";
export declare const AuthServices: {
    credentialsLogin: (payload: LoginPayload) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: string | null;
            id: string;
            email: string;
            role: string;
            createdAt: Date;
        };
    }>;
    getNewAccessToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map