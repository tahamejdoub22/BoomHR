import express from "express";
import { createNetSalary, getAllnetsalary } from "../controllers/netsalarycontroller.js";

const router = express.Router();

router.post("/payroll", createNetSalary);
router.get("/payroll", getAllnetsalary);

export { router as PayrollRoute };