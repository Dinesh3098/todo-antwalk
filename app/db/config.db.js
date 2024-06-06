import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Pool } = require("pg");

let pool;

const dbPool = async () => {
    if (pool) return pool;

    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME || "postgres",
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: true,
        options: `project=${process.env.ENDPOINT_ID}`,
    });

    try {
        await pool.query("SELECT 1");
        console.log("Connected to PostgreSQL");
      } catch (error) {
        console.error("Failed to connect to PostgreSQL", error);
      }

    return pool;
}


export { dbPool };
