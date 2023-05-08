import express from "express";
import { getEmployes, getEmployerById, updateEmploye, deleteEmploye, deleteEmployers,createEmployerAndAddToDepartment } from "../controllers/employer.controller.js";

const router = express.Router();

// Allow CORS
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

router.get("/api/auth/emp/", getEmployes);
router.get("/api/auth/emp/:id", getEmployerById);
router.post("/api/auth/emp/add", createEmployeAndAddToDepartment);
router.patch("/api/auth/emp/:id", updateEmploye);
router.delete("/api/auth/emp/:id", deleteEmploye);
router.delete("/", deleteEmployers);

export default router;