import { Router } from "express";
import { adminRouter } from "./admin.js";
import { userRouter } from "./user.js";
import { spaceRouter } from "./space.js";
import { SigninSchema, SignupSchema } from "../../types/index.js";
import { z } from "zod";
import { hash, compare } from "../../scrypt.js";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import prisma from "@repo/db/client";
import { PrismaClient } from "@repo/db/client";
const client = new PrismaClient();
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// const prisma = new client();
import { JWT_SECRET } from "../../config.js";
export const router = Router();

router.post("/signup", async (req, res) => {
    const parsedData = SignupSchema.safeParse(req.body);
    console.log(req.body);
    // console.log(parsedData.data);
    if (!parsedData.success) {
        res.status(400).json({
            message: "validation failed",
            errors: parsedData.error.errors,
            data: parsedData,
        });
        return;
    }
    const hashedPassword = await hash(parsedData.data.password);
    try {
        const user = await client.user.create({
            data: {
                username: parsedData.data.username,
                password: hashedPassword,
                role: parsedData.data.role === "admin" ? "ADMIN" : "USER",
            },
        });
        res.status(200).json({
            message: "User created successfully",
            userId: user.id,
        });
        return;
    } catch (error) {
        res.status(400).json({ message: "User already exists" });
    }
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
                username: parsedData.data.username,
            },
        });
        if (!user) {
            res.status(403).json({ message: "User not found" });
            return;
        }
        const isPasswordValid = await compare(parsedData.data.password,user.password);
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
