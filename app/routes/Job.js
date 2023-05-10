import express from "express";
import {filter, getAll, save} from "../controllers/Job.js";

const router = express.Router();

router
    .post("/save",save)
    .post('/jobs',filter)
    .get("/",getAll)

export default router;
