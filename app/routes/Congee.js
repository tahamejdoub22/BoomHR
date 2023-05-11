import express from "express";
import { add } from "../controllers/Congee.js";

const router = express.Router();

router
    .post("/Request",add)

export default router;
