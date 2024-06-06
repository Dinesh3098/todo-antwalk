import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Pool } = require("pg");

const initMigration = async () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: "postgres",
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: true,
        options: `project=${process.env.ENDPOINT_ID}`,
    });

    try {
        await pool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.info(`Database "tododb" created successfully.`);
    } catch (err) {
        if (err?.code === `42P04`) {
            console.info(`Database "tododb" already exists.`);
        } else if (err?.code === "XX000") {
            console.error(`password authentication failed for user '${process.env.DB_USER}'`);
            process.exit(1);
        } else if (err?.code === "ECONNREFUSED") {
            console.error(`Error connecting to database:`, err);
            process.exit(1);
        } else {
            console.error(`Error creating database:`, err);
            process.exit(1);
        }
    }
    await pool.end();

    // Reconnect to the newly created database
    const tododbPool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: true,
        options: `project=${process.env.ENDPOINT_ID}`,
    });

    const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE
    );
    `;

    try {
        await tododbPool.query(createTablesQuery);
        console.info(`Tables "users" and "todos" created successfully.`);
    } catch (err) {
        console.error(`Error creating tables:`, err);
        process.exit(1);
    } finally {
        tododbPool.end();
    }
};

export { initMigration };
