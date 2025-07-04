import { Router } from "express";
import { adminRouter } from "./admin.js";
import { userRouter } from "./user.js";
import { spaceRouter } from "./space.js";
export const router= Router();

router.post("/signup",(req,res)=>{
    res.json({
        message: "Signup page"
    })
});
router.post("/signin",(req,res)=>{
    res.json({
        message: "Signin page"
    })
});

router.get("/elements",(req,res)=>{
    res.json({
        message: "Elements page"
    })
});
router.get("/avatar",(req,res)=>{
    res.json({
        message: "Elements page"
    })
});

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/space", spaceRouter);

