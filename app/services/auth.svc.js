import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { sign, verify } = require("jsonwebtoken");
import { createTransport } from "nodemailer";
import { hash } from "bcrypt";
import { findUserByEmail, createUser } from "../db/query.db.js";

const sendMagicLink = async (email) => {
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            console.error("User not found", email);
            throw new Error("User not found");
        }
    } catch (err) {
        console.error(err);
        throw new Error("unable to find user");
    }

    const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const emailContent = `Click on the link to login: ${process.env.BASE_URL}/user/login?token=${token}`;

    console.info("emailContent", emailContent);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Magic Link Login",
        text: emailContent,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error(err);
        throw new Error("unable to send email");
    }
};

const verifyMagicLink = async (token) => {
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const user = await findUserByEmail(decoded.email);
        if (!user) {
            console.error("User not found", decoded.email);
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Invalid or expired token");
    }
};

const registerUser = async (email, password) => {
    const hashedPassword = await hash(password, 10);
    try {
        const user = await createUser(email, hashedPassword);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error("unable to create user");
    }
};

export { sendMagicLink, verifyMagicLink, registerUser };
