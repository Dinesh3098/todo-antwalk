import { Router } from "express";
import { pingHandler } from "../handlers/ping.handler.js";
import { todoRoutes } from "./todos/todo.route.js";
import { userRoutes } from "./users/user.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const routes = () => {
    const router = Router();

    /**
     * @swagger
     * /ping:
     *   get:
     *     tags:
     *       - Health
     *     summary: Ping the server
     *     responses:
     *       200:
     *         description: Pong
     */
    router.get("/ping", pingHandler);

    router.use("/user", userRoutes());
    router.use("/todos", authMiddleware, todoRoutes());

    printRoutes(router);
    return router;
};

const printRoutes = (router, prefix = "") => {
    router.stack.forEach((layer) => {
        if (layer?.route) {
            console.log(
                `${layer?.route?.stack[0]?.method?.toUpperCase()} ${prefix}${
                    layer?.route?.path
                }`
            );
        }
    });
};

export { routes, printRoutes };
