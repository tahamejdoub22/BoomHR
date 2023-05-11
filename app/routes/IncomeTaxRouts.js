import express from "express";
import { createDeduction, deleteDeduction, getAllDeductions, getdeductionByGrossSalary, updateDeduction } from "../controllers/deductionController.js";
import { createIncomeTax, getAlltax, getIncomeTaxByGrossSalary } from "../controllers/incometaxController.js";

const router = express.Router();

// Route to calculate income tax for an employee
router.post('/:grossSalaryId', createIncomeTax);
router.post('/deduction/:grossSalary_id', createDeduction);
router.get('/deduction', getAllDeductions);
router.get('/', getAlltax);
router.get('/:grossSalaryId', getIncomeTaxByGrossSalary);
router.get('/deduction/:grossSalaryId', getdeductionByGrossSalary);

export { router as IncomeTaxRoute };