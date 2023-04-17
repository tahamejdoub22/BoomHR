import express from "express";
import { ForgetPassword, Login, add, addEmployee, addEntreprise, getAllEmployees, getEmployee, resetPassword, verif } from "../controllers/Employee.js";

const router = express.Router();

router
    .post("/Login",Login)
    .post("/forget",ForgetPassword)
    .post("/test",verif)
    .post("/reset",resetPassword)
    .post("/home",getEmployee)
    .post('/add',add)
    .post('/addemployee',addEmployee)
    .post('/addentr',addEntreprise)
    .get('/',getAllEmployees)

export default router;
