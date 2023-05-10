import express from "express";
import { createBenefit, getAllbenefit, getbenefitByGrossSalary } from "../controllers/benefitcontroller.js";

const router = express.Router();

// Route for calculating benefit amount
router.post('/benefits', createBenefit);
router.get('/benefits', getAllbenefit);
router.get('/benefits/:grossSalaryId', getbenefitByGrossSalary);

 export { router as benefitRoute };
