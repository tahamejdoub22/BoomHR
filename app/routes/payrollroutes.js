import express from "express";
import { createNetSalary, getAllnetsalary, getAllnetsalaryss, getNetSalaryByEmployeeId, getNetSalaryById } from "../controllers/netsalarycontroller.js";

const router = express.Router();

router.post("/payroll", createNetSalary);
router.get("/payroll", getAllnetsalary);
router.get("/:id", getNetSalaryById);
router.get('/employee/:employeeId', getNetSalaryByEmployeeId); // new route for net salary by employee ID
router.get("/payrolls", getAllnetsalaryss);

export { router as PayrollRoute };