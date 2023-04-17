import express from "express";
import { createBenefit, getAllbenefit } from "../controllers/benefitcontroller.js";

const router = express.Router();

// Route for calculating benefit amount
router.post('/benefits', createBenefit);
router.get('/benefits', getAllbenefit);

 export { router as benefitRoute };
