import express from "express";
import { calculateAndSaveGrossSalary, checkIn, checkOut, deleteGrossSalary, getAllGrossSalaries, getAttendance, getAttendanceHistory, updateGrossSalaryHourlyRate } from "../controllers/attendanceController.js";

// attendanceRoutes.js


const router = express.Router();

router.post('/check-in', checkIn);
router.patch('/check-out/:id', checkOut);
router.get('/employees/:employee_id', getAttendanceHistory);
router.get('/', getAttendance);
router.post('/employees/:id/gross-salary/:year/:month',calculateAndSaveGrossSalary);
router.get('/grossSalary', getAllGrossSalaries);
// DELETE /api/grosssalaries/:id
router.delete("/grossSalary/:id", deleteGrossSalary);

// PUT /api/grosssalaries/:id/hourly-rate
router.put("/grossSalary/:id/hourly-rate", updateGrossSalaryHourlyRate);

export { router as attendanceRoutes };
