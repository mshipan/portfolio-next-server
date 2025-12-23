import { Prisma } from "@prisma/client";
export declare const ProjectServices: {
    createProject: (payload: Prisma.ProjectCreateInput) => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        slug: string;
        updatedAt: Date;
        description: string;
        techStack: string[];
        features: string[];
        featured: boolean;
        repoUrl: string | null;
        liveUrl: string | null;
        thumbnail: string | null;
    }>;
    getAllProjects: () => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        slug: string;
        updatedAt: Date;
        description: string;
        techStack: string[];
        features: string[];
        featured: boolean;
        repoUrl: string | null;
        liveUrl: string | null;
        thumbnail: string | null;
    }[]>;
    getSingleProject: (slug: string) => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        slug: string;
        updatedAt: Date;
        description: string;
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
        updatedAt: Date;
        description: string;
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