import express from "express";
import { getDepartements, createDepartement, getDepartementById, deleteDepartement, updateDepartementById } from "../controllers/department.js";

const router = express.Router();

// Route to calculate income tax for an employee
router.post('/get', getDepartements);
router.post('/cretae', createDepartement);
router.get('/getByid/:id', getDepartementById);
router.delete('/delete/:id', deleteDepartement);
router.put('/update/:id', updateDepartementById);

export default router