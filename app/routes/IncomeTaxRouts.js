import express from "express";
import { createDeduction, deleteDeduction, getAllDeductions, updateDeduction } from "../controllers/deductionController.js";
import { createIncomeTax, getAlltax } from "../controllers/incometaxController.js";

const router = express.Router();

// Route to calculate income tax for an employee
router.post('/:grossSalaryId', createIncomeTax);
router.post('/deduction/:grossSalary_id', createDeduction);
router.get('/deduction', getAllDeductions);
router.get('/', getAlltax);

export { router as IncomeTaxRoute };