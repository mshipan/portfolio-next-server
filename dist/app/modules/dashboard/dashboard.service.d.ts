export declare const DashboardServices: {
    getDashboardOverview: () => Promise<{
        stats: {
            blogs: {
                total: number;
                published: number;
                drafts: number;
                monthlyTrend: Record<string, number>;
                blogGrowth: {
                    month: string;
                    count: number;
                }[];
            };
            projects: {
                total: number;
                featured: number;
                nonFeatured: number;
                techStackCount: {
                    tech: string;
                    count: number;
                }[];
            };
            about: {
                totalSkills: number;
                totalExperiences: number;
                totalEducations: number;
            };
        };
        experienceTimeline: {
            company: string;
            start: string;
            end: string;
            duration: number;
        }[];
        latestBlogs: {
            id: string;
            createdAt: Date;
            title: string;
            slug: string;
            category: string | null;
            summary: string | null;
            content: string;
            published: boolean;
            coverUrl: string | null;
            updatedAt: Date;
            authorId: string;
        }[];
        latestProjects: {
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
};
//# sourceMappingURL=dashboard.service.d.ts.map