import express from "express";
import {save} from "../controllers/Formulaire.js";

const router = express.Router();

router
        .post("/save",save)

export default router;
