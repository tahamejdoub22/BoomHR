import express from "express";
import { addHourlyRate, calculateSalary } from "../controllers/salary.js";

// attendanceRoutes.js


const router = express.Router();

// Calculate salary for a given employee and month
router.post('/salary/:employeeId/:month', async (req, res) => {
  const { employeeId, month } = req.params;

  try {
    const salary = await calculateSalary(employeeId, month);

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.post("/hourly-rate", addHourlyRate);

export { router as salaryRoutes };