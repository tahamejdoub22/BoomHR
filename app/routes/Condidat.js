import express from "express";
import {login, save} from "../controllers/Condidat.js";

const router = express.Router();

router
    .post("/save",save)
    .post("/login",login)

export default router;
