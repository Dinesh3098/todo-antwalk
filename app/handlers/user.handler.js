import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");
import {
    sendMagicLink,
    verifyMagicLink,
    registerUser,
} from "../services/auth.svc.js";

const registerUserHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await registerUser(email, password);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const magicLinkHandler = async (req, res) => {
    const { email } = req.body;
    try {
        await sendMagicLink(email);
        res.json({ msg: "Magic link sent" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const verifyMagicLinkHandler = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await verifyMagicLink(token);
        const authToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ token: authToken });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export { registerUserHandler, magicLinkHandler, verifyMagicLinkHandler };
