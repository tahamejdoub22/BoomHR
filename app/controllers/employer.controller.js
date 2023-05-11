import Department from "../models/departement.model.js";
import Employer from "../models/Employee.js";
import mongoose from "mongoose";

// get all employes
export const getEmployes = async (req, res) => {
    try {
      const employes = await Employer.find(
        
      );
      res.status(200).json(employes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getEmployerById = async (req, res) => {
    try {
      const employer = await Employer.findById(req.params.id).populate("tasks");
      if (!employer) {
        return res.status(404).json({ message: "Employer not found" });
      }
      res.status(200).json(employer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const createEmploye = async (req, res) => {
    const newEmployer = new Employer({
        email: req.body.email,
        password:req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        job_title: req.body.job_title,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        hire_date: req.body.hire_date,
        phone: req.body.phone,
        address: req.body.address,
        department: req.body.department,
        dateofbirth: req.body.dateofbirth,
        sick: req.body.sick,
        vacation: req.body.vacation,
        avatar:   req.body.avatar

      });    const newEmploye = new Employer(newEmployer);
    try {
      await newEmploye.save();
      res.status(201).json(newEmploye);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

// update one employe
export const updateEmploye = async (req, res) => {
    const { id } = req.params;
    const employe = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employer with id: ${id}`);
    try {
      const updatedEmployer = await Employer.findByIdAndUpdate(id, { ...employe, id }, { new: true });
      res.json(updatedEmployer);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  
  export const deleteEmploye = async (req, res) => {
    const { id } = req.params;
    try {
      const employer = await Employer.findById(id);
      if (!employer) {
        return res.status(404).send(`No employer with id: ${id}`);
      }
      await employer.remove();
      res.json({ message: "Employer deleted successfully." });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  
  // delete multiple employers
  export const deleteEmployers = async (req, res) => {
    const { ids } = req.body;
    try {
      await Employer.deleteMany({ _id: { $in: ids } });
      res.json({ message: "Employers deleted successfully." });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
// create an employe and add it to the departement
export const createEmployerAndAddToDepartment = async (req, res) => {
    const { department } = req.body;
  
    const newEmployer = new Employer({
      avatar: req.body.avatar,
      email: req.body.email,
      password:req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      jobtitle: req.body.jobtitle,
      departement_id: req.body.departement_id,
      resetCode: req.body.resetCode,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      hire_date: req.body.hire_date,
      phone: req.body.phone,
      address: req.body.address,
      sick: req.body.sick,
      fcmToken: req.body.fcmToken,
      vacation: req.body.vacation,
      salary: req.body.salary,
      jobtype: req.body.jobtype,
      department: req.body.department,
      firstday: req.body.firstday,
      lastday: req.body.lastday,
      dateofbirth: req.body.dateofbirth,
    });
  
    try {
      const dep = await Department.findOne({ name: department });
      console.log("2" + department);
  
      const doc = await newEmployer.save();
      dep.employeId.push(doc._id);
      await dep.save();
  
      res.status(201).json(doc);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };