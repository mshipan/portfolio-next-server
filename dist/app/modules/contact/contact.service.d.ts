import { Prisma } from "@prisma/client";
export declare const ContactServices: {
    sendEmail: (payload: Prisma.ContactMessageCreateInput) => Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        message: string;
        isRead: boolean;
    }>;
    getAllMessages: (query: Record<string, any>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: {
            name: string;
            id: string;
            email: string;
            createdAt: Date;
            message: string;
            isRead: boolean;
        }[];
    }>;
    markAsRead: (id: string) => Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        message: string;
        isRead: boolean;
    }>;
    deleteMessage: (id: string) => Promise<{
        message: string;
    }>;
    getUnreadCount: () => Promise<number>;
};
//# sourceMappingURL=contact.service.d.ts.map