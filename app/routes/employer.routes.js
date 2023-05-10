import express from "express";
import { getEmployes, getEmployerById, updateEmploye, deleteEmploye, deleteEmployers,createEmployerAndAddToDepartment } from "../controllers/employer.controller.js";

const router = express.Router();

// Allow CORS
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

router.get("/all", getEmployes);
router.get("/:id", getEmployerById);
router.post("/add", createEmployerAndAddToDepartment);
router.patch("/emp/:id", updateEmploye);
router.delete("/emp/:id", deleteEmploye);
router.delete("/", deleteEmployers);

export default router;