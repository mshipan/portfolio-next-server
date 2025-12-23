"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardServices = void 0;
const db_1 = require("../../config/db");
const getDashboardOverview = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalBlogs = yield db_1.prisma.blog.count();
    const totalPublishedBlogs = yield db_1.prisma.blog.count({
        where: { published: true },
    });
    const totalDraftBlogs = totalBlogs - totalPublishedBlogs;
    const totalProjects = yield db_1.prisma.project.count();
    const totalFeaturedProjects = yield db_1.prisma.project.count({
        where: { featured: true },
    });
    const totalNonFeaturedProjects = totalProjects - totalFeaturedProjects;
    const latestBlogs = yield db_1.prisma.blog.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    });
    const latestProjects = yield db_1.prisma.project.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    });
    const blogs = yield db_1.prisma.blog.findMany({ select: { createdAt: true } });
    const blogMonthlyTrend = {};
    blogs.forEach((blog) => {
        const month = blog.createdAt.toISOString().slice(0, 7);
        blogMonthlyTrend[month] = (blogMonthlyTrend[month] || 0) + 1;
    });
    const now = new Date();
    const blogGrowth = Array.from({ length: 12 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = d.toISOString().slice(0, 7);
        return { month: key, count: blogMonthlyTrend[key] || 0 };
    }).reverse();
    const projects = yield db_1.prisma.project.findMany({
        select: { techStack: true },
    });
    const techStackCount = {};
    projects.forEach((p) => {
        p.techStack.forEach((tech) => {
            techStackCount[tech] = (techStackCount[tech] || 0) + 1;
        });
    });
    const sortedTechStack = Object.entries(techStackCount)
        .sort((a, b) => b[1] - a[1])
        .map(([tech, count]) => ({ tech, count }));
    const about = yield db_1.prisma.about.findFirst({
        include: {
            skills: true,
            experiences: true,
            educations: true,
        },
    });
    const totalSkills = (about === null || about === void 0 ? void 0 : about.skills.length) || 0;
    const totalExperiences = (about === null || about === void 0 ? void 0 : about.experiences.length) || 0;
    const totalEducations = (about === null || about === void 0 ? void 0 : about.educations.length) || 0;
    const experienceTimeline = (about === null || about === void 0 ? void 0 : about.experiences.map((exp) => {
        var _a;
        return ({
            company: exp.company,
            start: exp.startYear,
            end: (_a = exp.endYear) !== null && _a !== void 0 ? _a : "present",
            duration: exp.endYear
                ? parseInt(exp.endYear) - parseInt(exp.startYear)
                : new Date().getFullYear() - parseInt(exp.startYear),
        });
    })) || [];
    return {
        stats: {
            blogs: {
                total: totalBlogs,
                published: totalPublishedBlogs,
                drafts: totalDraftBlogs,
                monthlyTrend: blogMonthlyTrend,
                blogGrowth,
            },
            projects: {
                total: totalProjects,
                featured: totalFeaturedProjects,
                nonFeatured: totalNonFeaturedProjects,
                techStackCount: sortedTechStack,
            },
            about: { totalSkills, totalExperiences, totalEducations },
        },
        experienceTimeline,
        latestBlogs,
        latestProjects,
    };
});
exports.DashboardServices = {
    getDashboardOverview,
};
//# sourceMappingURL=dashboard.service.js.map