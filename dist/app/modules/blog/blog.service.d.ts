import { Prisma } from "@prisma/client";
export declare const BlogServices: {
    createBlog: (payload: Prisma.BlogCreateInput) => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        slug: string;
        summary: string | null;
        content: string;
        published: boolean;
        coverUrl: string | null;
        updatedAt: Date;
        authorId: string;
    }>;
    getAllBlogs: () => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        slug: string;
        summary: string | null;
        content: string;
        published: boolean;
        coverUrl: string | null;
        updatedAt: Date;
        authorId: string;
    }[]>;
    getSingleBlog: (slug: string) => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        slug: string;
        summary: string | null;
        content: string;
        published: boolean;
        coverUrl: string | null;
        updatedAt: Date;
        authorId: string;
    }>;
    updateBlog: (slug: string, payload: Prisma.BlogUpdateInput) => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        slug: string;
        summary: string | null;
        content: string;
        published: boolean;
        coverUrl: string | null;
        updatedAt: Date;
        authorId: string;
    }>;
    deleteBlog: (slug: string) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=blog.service.d.ts.map