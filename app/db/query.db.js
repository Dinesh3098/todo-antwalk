import { dbPool } from "./config.db.js";

const findUserByEmail = async (email) => {
    const pool = await dbPool();
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    return res.rows[0];
};

const createUser = async (email, password) => {
    const pool = await dbPool();
    const res = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, password]
    );
    return res.rows[0];
};

const getTodos = async (
    userId,
    { page = 1, limit = 10, search = "", sort = "id", order = "ASC" }
) => {
    const pool = await dbPool();
    const offset = (page - 1) * limit;
    const searchQuery = `%${search}%`;
    const res = await pool.query(
        `SELECT * FROM todos WHERE user_id = $1 AND title ILIKE $2 ORDER BY ${sort} ${order} LIMIT $3 OFFSET $4`,
        [userId, searchQuery, limit, offset]
    );

    // calculate total pages for pagination
    const total = await pool.query(
        `SELECT COUNT(*) FROM todos WHERE user_id = $1 AND title ILIKE $2`,
        [userId, searchQuery]
    );
    const totalPages = Math.ceil(total.rows[0].count / limit);

    return { todos: res.rows, totalPages, page: parseInt(page), limit: parseInt(limit), order, sort };

};

const createTodo = async (userId, title) => {
    const pool = await dbPool();
    const res = await pool.query(
        "INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *",
        [userId, title]
    );
    return res.rows[0];
};

const updateTodo = async (id, title, completed) => {
    const pool = await dbPool();
    const res = await pool.query(
        "UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
        [title, completed, id]
    );
    return res.rows[0];
};

const deleteTodo = async (id) => {
    const pool = await dbPool();
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    return { message: "Todo deleted" };
};

export {
    findUserByEmail,
    createUser,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
