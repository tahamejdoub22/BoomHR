import express from "express";
import multer from "../config/multer-config.js";
import { save } from "../controllers/Post.js";

const router = express.Router();

router
    .post("/save",multer ,save)


export default router;