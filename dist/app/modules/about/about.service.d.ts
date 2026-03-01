import { Prisma } from "@prisma/client";
export declare const AboutServices: {
    createOrUpdateAbout: (payload: Prisma.AboutCreateInput) => Promise<{
        skills: {
            name: string;
            id: string;
            category: string | null;
            photo: string | null;
            aboutId: string | null;
        }[];
        experiences: {
            id: string;
            description: string | null;
            aboutId: string;
            jobTitle: string;
            company: string;
            startYear: string;
            endYear: string | null;
            achievements: string[];
        }[];
        educations: {
            id: string;
            description: string | null;
            aboutId: string;
            startYear: string;
            endYear: string | null;
            degree: string;
            institution: string;
        }[];
    } & {
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        bio: string;
        phone: string | null;
        address: string | null;
        github: string | null;
        linkedIn: string | null;
        photo: string | null;
    }>;
    getAbout: () => Promise<{
        skills: {
            name: string;
            id: string;
            category: string | null;
            photo: string | null;
            aboutId: string | null;
        }[];
        experiences: {
            id: string;
            description: string | null;
            aboutId: string;
            jobTitle: string;
            company: string;
            startYear: string;
            endYear: string | null;
            achievements: string[];
        }[];
        educations: {
            id: string;
            description: string | null;
            aboutId: string;
            startYear: string;
            endYear: string | null;
            degree: string;
            institution: string;
        }[];
    } & {
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        bio: string;
        phone: string | null;
        address: string | null;
        github: string | null;
        linkedIn: string | null;
        photo: string | null;
    }>;
    updateAboutPhoto: (photo: string) => Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        bio: string;
        phone: string | null;
        address: string | null;
        github: string | null;
        linkedIn: string | null;
        photo: string | null;
    }>;
    createSkill: (payload: Prisma.SkillCreateInput) => Promise<{
        name: string;
        id: string;
        category: string | null;
        photo: string | null;
        aboutId: string | null;
    }>;
    getAllSkills: (query: Record<string, any>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: {
            name: string;
            id: string;
            category: string | null;
            photo: string | null;
            aboutId: string | null;
        }[];
    }>;
    updateSkill: (id: string, payload: Partial<Prisma.SkillUpdateInput>) => Promise<{
        name: string;
        id: string;
        category: string | null;
        photo: string | null;
        aboutId: string | null;
    }>;
    deleteSkill: (skillId: string) => Promise<{
        message: string;
    }>;
    createExperience: (payload: Prisma.ExperienceCreateInput) => Promise<{
        id: string;
        description: string | null;
        aboutId: string;
        jobTitle: string;
        company: string;
        startYear: string;
        endYear: string | null;
        achievements: string[];
    }>;
    getAllExperiences: (query: Record<string, any>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: {
            id: string;
            description: string | null;
            aboutId: string;
            jobTitle: string;
            company: string;
            startYear: string;
            endYear: string | null;
            achievements: string[];
        }[];
    }>;
    updateExperience: (id: string, payload: Partial<Prisma.ExperienceUpdateInput>) => Promise<{
        id: string;
        description: string | null;
        aboutId: string;
        jobTitle: string;
        company: string;
        startYear: string;
        endYear: string | null;
        achievements: string[];
    }>;
    deleteExperience: (experienceId: string) => Promise<{
        message: string;
    }>;
    createEducation: (payload: Prisma.EducationCreateInput) => Promise<{
        id: string;
        description: string | null;
        aboutId: string;
        startYear: string;
        endYear: string | null;
        degree: string;
        institution: string;
    }>;
    getAllEducations: (query: Record<string, any>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: {
            id: string;
            description: string | null;
            aboutId: string;
            startYear: string;
            endYear: string | null;
            degree: string;
            institution: string;
        }[];
    }>;
    updateEducation: (id: string, payload: Partial<Prisma.EducationUpdateInput>) => Promise<{
        id: string;
        description: string | null;
        aboutId: string;
        startYear: string;
        endYear: string | null;
        degree: string;
        institution: string;
    }>;
    deleteEducation: (educationId: string) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=about.service.d.ts.map