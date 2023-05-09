
import multer from '../middlewares/multer-config.js'
import express from "express";
import {save} from "../controllers/Post.js";
const router = express.Router();

router
    .post("/save",multer ,save)


export default router;
