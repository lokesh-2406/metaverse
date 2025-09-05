import express from "express";
import { router } from "./routes/v1/index.js";
// import PrismaClient from "@repo/db/client";
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.listen(process.env.PORT || 3000);
