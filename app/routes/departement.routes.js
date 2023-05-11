import express from "express";
import { createDepartement, deleteDepartement, getDepartementById, getDepartements, updateDepartementById } from "../controllers/department.js";

const router = express.Router();

// Route to calculate income tax for an employee
router.get('/all', getDepartements);
router.post('/add', createDepartement);
router.get('/:id', getDepartementById);
router.delete('/:id', deleteDepartement);
router.put('/:id', updateDepartementById);

export default router