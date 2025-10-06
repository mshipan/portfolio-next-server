import { prisma } from "../../config/db";

const getDashboardOverview = async () => {
  const totalBlogs = await prisma.blog.count();
  const totalPublishedBlogs = await prisma.blog.count({
    where: { published: true },
  });
  const totalDraftBlogs = totalBlogs - totalPublishedBlogs;

  const totalProjects = await prisma.project.count();
  const totalFeaturedProjects = await prisma.project.count({
    where: { featured: true },
  });
  const totalNonFeaturedProjects = totalProjects - totalFeaturedProjects;

  const latestBlogs = await prisma.blog.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const latestProjects = await prisma.project.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const blogs = await prisma.blog.findMany({ select: { createdAt: true } });
  const blogMonthlyTrend: Record<string, number> = {};
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

  const projects = await prisma.project.findMany({
    select: { techStack: true },
  });
  const techStackCount: Record<string, number> = {};
  projects.forEach((p) => {
    p.techStack.forEach((tech) => {
      techStackCount[tech] = (techStackCount[tech] || 0) + 1;
    });
  });

  const sortedTechStack = Object.entries(techStackCount)
    .sort((a, b) => b[1] - a[1])
    .map(([tech, count]) => ({ tech, count }));

  const about = await prisma.about.findFirst({
    include: {
      experiences: true,
      educations: true,
    },
  });
  const totalSkills = about?.skills.length || 0;
  const totalExperiences = about?.experiences.length || 0;
  const totalEducations = about?.educations.length || 0;

  const experienceTimeline =
    about?.experiences.map((exp) => ({
      company: exp.company,
      start: exp.startYear,
      end: exp.endYear ?? "present",
      duration: exp.endYear
        ? parseInt(exp.endYear) - parseInt(exp.startYear)
        : new Date().getFullYear() - parseInt(exp.startYear),
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
};

export const DashboardServices = {
  getDashboardOverview,
};
