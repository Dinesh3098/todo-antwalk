import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../db/query.db.js";

const getTodosHandler =async (req, res) => {
    const { page, limit, search, sort, order } = req.query;
    const todos = await getTodos(req.user.id, { page, limit, search, sort, order });
    res.json({ data: todos });
};

const createTodoHandler = async (req, res) => {
    const { title } = req.body;
    const todo = await createTodo(req.user.id, title);
    res.json({ data: todo });
};

const updateTodoHandler = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await updateTodo(id, title, completed);
    res.json({ data: todo });
};

const deleteTodoHandler = async (req, res) => {
    const { id } = req.params;
    const response = await deleteTodo(id);
    res.json({ data: response });
};

export {
    getTodosHandler,
    createTodoHandler,
    updateTodoHandler,
    deleteTodoHandler,
};
