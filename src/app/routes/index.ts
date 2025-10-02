import { Router } from "express";
import { authRouter } from "../modules/v1/auth/auth.route";
import { blogRouter } from "../modules/v1/blog/blog.route";
import { caseRouter } from "../modules/v1/case-study/case.route";
import { projectRouter } from "../modules/v1/project/project.route";
import { userRouter } from "../modules/v1/user/user.route";

export const router = Router();

const moduleRoutes: Array<{ path: string; route: Router }> = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/blog",
    route: blogRouter,
  },
  {
    path: "/case-study",
    route: caseRouter,
  },
  {
    path: "/project",
    route: projectRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
