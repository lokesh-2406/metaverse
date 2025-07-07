import { Router } from "express";
import { adminRouter } from "./admin.js";
import { userRouter } from "./user.js";
import { spaceRouter } from "./space.js";
import { SigninSchema, SignupSchema } from "../../types/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "@repo/db/client";
import { JWT_SECRET } from "../../config.js";
export const router = Router();

router.post("/signup", async (req, res) => {
    const parsedData = SignupSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "validation failed",
            errors: parsedData.error.errors,
        });
        return;
    }
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    try {
        const user = await client.user.create({
            data: {
                username: parsedData.data.username,
                password: hashedPassword,
                // avatarId: parsedData.data.avatarId,
                role: parsedData.data.role === "admin" ? "ADMIN" : "USER",
            },
        });
        res.status(200).json({
            message: "User created successfully",
            userId: user.id,
        });
    } catch (error) {
        res.status(400).json({ message: "User already exists" });
    }
    res.json({
        message: "Signup page",
    });
});
router.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(403).json({
            message: "validation failed",
            errors: parsedData.error.errors,
        });
        return;
    }
    try {
        const user = await client.user.findUnique({
            where: {
                username: parsedData.data.email,
            },
        });
        if (!user) {
            res.status(403).json({ message: "User not found" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(
            parsedData.data.password,
            user.password
        );
        if (!isPasswordValid) {
            res.status(403).json({ message: "Invalid password" });
            return;
        }
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET
        );
        res.json({
            token,
        });
    } catch (error) {
        res.status(400).json({ message: "Internal server error" });
        return;
    }
    res.json({
        message: "Signin page",
    });
});

router.get("/elements", (req, res) => {
    res.json({
        message: "Elements page",
    });
});
router.get("/avatar", (req, res) => {
    res.json({
        message: "Elements page",
    });
});

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/space", spaceRouter);
