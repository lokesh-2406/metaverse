import { Router } from "express";

export const spaceRouter = Router();

spaceRouter.post("/", (req, res) => {
    res.json({
        message: "Space home page"
    });
})
spaceRouter.delete("/:spaceID", (req, res) => {
    res.json({
        message: `Space with ID ${req.params.spaceID} deleted`
    });
})
spaceRouter.get("/:spaceID", (req, res) => {
    res.json({
        message: `Space with ID ${req.params.spaceID}`
    });
})

spaceRouter.get("/all", (req, res) => {
    res.json({
        message: "All spaces"
    });
})
spaceRouter.post("/element", (req, res) => {
   
})

spaceRouter.delete("/element", (req, res) => {
   
})