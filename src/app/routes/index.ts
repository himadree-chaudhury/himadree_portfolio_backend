import { Router } from "express";

export const router = Router();

const moduleRoutes: Array<{ path: string; route: Router }> = [];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
