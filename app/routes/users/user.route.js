import { Router } from "express";
import {
    magicLinkHandler,
    registerUserHandler,
    verifyMagicLinkHandler,
} from "../../handlers/user.handler.js";
import { printRoutes } from "../index.route.js";

const userRoutes = () => {
    const router = Router();

    /**
     * @swagger
     * /user/register:
     *   post:
     *     tags:
     *       - Register
     *     summary: Register a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "dummy@rmail.com"
     *               password:
     *                 type: string
     *                 example: "password"
     *     responses:
     *       200:
     *         description: User registered
     *       400:
     *         description: Error registering user
     */
    router.post("/register", registerUserHandler);

    /**
     * @swagger
     * /user/magic-link:
     *   post:
     *     tags:
     *       - Login
     *     summary: Send magic link to login
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "dummy@rmail.com"
     *     responses:
     *       200:
     *         description: Magic link sent
     *       400:
     *         description: Error sending magic link
    */ 
    router.post("/magic-link", magicLinkHandler);

    /**
     * @swagger
     * /user/login:
     *   get:
     *     tags:
     *       - Login
     *     summary: Login with magic link
     *     responses:
     *       200:
     *         description: The auth token
     */
    router.get("/login", verifyMagicLinkHandler);

    printRoutes(router, "/user");
    return router;
};

export { userRoutes };
