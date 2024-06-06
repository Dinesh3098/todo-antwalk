import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { verify } = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }

    try {
        // split the token to get the actual token
        const token = req.headers["authorization"].split(" ");
        if (token.length !== 2) {
            return res.status(400).json({ error: "Invalid token" });
        }

        const actualToken = token[1];
        const decoded = verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

export { authMiddleware };
