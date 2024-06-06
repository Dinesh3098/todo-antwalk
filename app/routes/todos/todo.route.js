import { Router } from "express";
import {
    getTodosHandler,
    createTodoHandler,
    updateTodoHandler,
    deleteTodoHandler,
} from "../../handlers/todo.handler.js";
import { printRoutes } from "../index.route.js";

const todoRoutes = () => {
    const router = Router();

    /**
     * @swagger
     * /todos:
     *   get:
     *     tags:
     *       - Todo
     *     summary: Get all todos
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *         description: Page number
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *         description: Number of items per page
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         description: Search term
     *       - in: query
     *         name: sort
     *         schema:
     *           type: string
     *         description: Sort by field
     *       - in: query
     *         name: order
     *         schema:
     *           type: string
     *         description: Sort order (ASC/DESC)
     *     responses:
     *       200:
     *         description: A list of todos
     */
    router.get("/", getTodosHandler);

    /**
     * @swagger
     * /todos:
     *   post:
     *     tags:
     *       - Todo
     *     summary: Create a new todo
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: "Buy groceries"
     *     responses:
     *       200:
     *         description: New todo created
     *       400:
     *         description: Error creating todo
     */
    router.post("/", createTodoHandler);

    /**
     * @swagger
     * /todos/{id}:
     *   put:
     *     tags:
     *       - Todo
     *     summary: Update a todo
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Todo ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: "Buy groceries"
     *               completed:
     *                 type: boolean
     *                 example: false
     *     responses:
     *       200:
     *         description: Updated todo
     */
    router.put("/:id", updateTodoHandler);

    /**
     * @swagger
     * /todos/{id}:
     *   delete:
     *     tags:
     *       - Todo
     *     summary: Delete a todo
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Todo ID
     *     responses:
     *       200:
     *         description: The deleted todo
     */
    router.delete("/:id", deleteTodoHandler);

    printRoutes(router, "/todos");
    return router;
};
export { todoRoutes };
