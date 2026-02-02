import { Prisma } from "@prisma/client";
export declare const ProjectServices: {
    createProject: (payload: Prisma.ProjectCreateInput) => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        slug: string;
        published: boolean;
        updatedAt: Date;
        description: string;
        shortDescription: string;
        techStack: string[];
        features: string[];
        featured: boolean;
        repoUrl: string | null;
        liveUrl: string | null;
        thumbnail: string | null;
    }>;
    getAllProjects: (query: Record<string, any>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: {
            id: string;
            createdAt: Date;
            title: string;
            slug: string;
            published: boolean;
            updatedAt: Date;
            description: string;
            shortDescription: string;
            techStack: string[];
            features: string[];
            featured: boolean;
            repoUrl: string | null;
            liveUrl: string | null;
            thumbnail: string | null;
        }[];
    }>;
    getSingleProject: (slug: string) => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        slug: string;
        published: boolean;
        updatedAt: Date;
        description: string;
        shortDescription: string;
        techStack: string[];
        features: string[];
        featured: boolean;
        repoUrl: string | null;
        liveUrl: string | null;
        thumbnail: string | null;
    }>;
    updateProject: (slug: string, payload: Partial<Prisma.ProjectUpdateInput>) => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        slug: string;
        published: boolean;
        updatedAt: Date;
        description: string;
        shortDescription: string;
        techStack: string[];
        features: string[];
        featured: boolean;
        repoUrl: string | null;
        liveUrl: string | null;
        thumbnail: string | null;
    }>;
    deleteProject: (slug: string) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=project.service.d.ts.map