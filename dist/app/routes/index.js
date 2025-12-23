"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const project_route_1 = require("../modules/project/project.route");
const about_route_1 = require("../modules/about/about.route");
const dashboard_route_1 = require("../modules/dashboard/dashboard.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/blog",
        route: blog_route_1.BlogRoutes,
    },
    {
        path: "/project",
        route: project_route_1.ProjectRoutes,
    },
    {
        path: "/about",
        route: about_route_1.AboutRoutes,
    },
    {
        path: "/dashboard",
        route: dashboard_route_1.DashboardRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
//# sourceMappingURL=index.js.map