// src/app.js
import express, { json } from "express";
import { config } from "dotenv";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { initMigration } from "./app/migrations/init.migration.js";
import { routes } from "./app/routes/index.route.js";
import { dbPool } from "./app/db/config.db.js";

config({ path: "./config/.env" });

const main = async () => {
    const app = express();
    app.use(json());

    // run migration to create database and tables. Initialize db connection pool
    try {
        await initMigration();
        await dbPool();
    } catch (error) {
        console.error(`Error migrating database:`, error);
        process.exit(1);
    }

    const swaggerOptions = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "ToDo App API",
                version: "1.0.0",
                description: "ToDo App API documentation",
            },
            servers: [
                {
                    url: "http://localhost:3000",
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        apis: ["./app/routes/*.js", "./app/routes/**/*.js"],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.use(routes());

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

main();
