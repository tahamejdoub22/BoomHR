import express from "express";
import { createEmployerAndAddToDepartment, deleteEmploye, deleteEmployers, getEmployerById, getEmployes, updateEmploye } from "../controllers/employer.controller.js";

const router = express.Router();

// Allow CORS
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

router.get("/all", getEmployes);
router.get("/:id", getEmployerById);
router.post("/add", createEmployerAndAddToDepartment);
router.patch("/:id", updateEmploye);
router.delete("/:id", deleteEmploye);
router.delete("/", deleteEmployers);

export default router;