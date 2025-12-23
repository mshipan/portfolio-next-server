import { Prisma } from "@prisma/client";
export declare const AboutServices: {
    createOrUpdateAbout: (payload: Prisma.AboutCreateInput) => Promise<{
        skills: {
            name: string;
            id: string;
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
        photo: string | null;
    }>;
    getAbout: () => Promise<{
        skills: {
            name: string;
            id: string;
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
        photo: string | null;
    }>;
    createSkill: (payload: Prisma.SkillCreateInput) => Promise<{
        name: string;
        id: string;
        photo: string | null;
        aboutId: string | null;
    }>;
    getAllSkills: () => Promise<{
        name: string;
        id: string;
        photo: string | null;
        aboutId: string | null;
    }[]>;
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
    }>;
    getAllExperiences: () => Promise<{
        id: string;
        description: string | null;
        aboutId: string;
        jobTitle: string;
        company: string;
        startYear: string;
        endYear: string | null;
    }[]>;
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
    getAllEducations: () => Promise<{
        id: string;
        description: string | null;
        aboutId: string;
        startYear: string;
        endYear: string | null;
        degree: string;
        institution: string;
    }[]>;
    deleteEducation: (educationId: string) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=about.service.d.ts.map