
const config = require("../config/auth.config");
const db = require("../models");

const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Employe = require("../models/employer.model");
const Project = require("../models/projet.model");
const Departement = require("../models/departement.model");



// get all employes
exports. getEmployes = async (req, res) => {
    try {
        const employes = await Employe.find();
        res.status(200).json(employes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get one employe
// exports. getEmploye = async (req, res) => {
//     try {
//         const employes = await Employe.findById(id);
//         res.status(200).json(employes);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }
// exports.getEmploye = async (req, res) => {
//     try {
//       const id = req.params.id; // extract the id parameter from the URL path
//       const employe = await Employe.findById(id);
//       if (!employe) {
//         return res.status(404).json({ message: "Employe not found" });
//       }
//       res.status(200).json(employe);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
exports.getEmployerById = async (req, res) => {
    try {
      const employer = await Employe.findById(req.params.id).populate("tasks");
      if (!employer) {
        return res.status(404).json({ message: "Employer not found" });
      }
      res.status(200).json(employer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// get the eploye's profile
// exports.getEmployeProfile = async (req, res) => {
    
//     try {
//         const employe = await Employe.findById(id);
//         res.status(200).json(employe.profile);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// create one employe
// withut picture 
exports.createEmploye = async (req, res) => {
   
    const employe = req.body;
    const newEmploye = new Employe(employe);
    try {
        await newEmploye.save();
        res.status(201).json(newEmploye);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// update one employe
exports.updateEmploye = async (req, res) => {
    const { id } = req.params;
    const employe = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employe with id: ${id}`);
    const updatedEmploye = await Employe.findByIdAndUpdate(id, { ...employe, id }, { new: true });
    res.json(updatedEmploye);
}

// delete one employe
// exports.deleteEmploye = async (req, res) => {
//     const { id } = req.params;
//    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employe with id: ${id}`);
//     await Employe.findByIdAndRemove(id);
//     res.json({ message: "Employe deleted successfully." });
// }
// exports.deleteEmploye = async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       // Find the employee
//       const employee = await Employe.findById(id);
  
//       if (!employee) {
//         return res.status(404).json({ message: "Employee not found" });
//       }
  
//       // Remove the employee from all the projects they're part of
//     //   await Project.updateMany(
//     //     { team: employee._id },
//     //     { $pull: { team: employee._id } }
//     //   );
  
//       // Remove the employee from all the tasks they're assigned to
//     //   await Task.updateMany(
//     //     { owner: employee._id },
//     //     { $unset: { owner: "" } }
//     //   );
      
//       // Remove the employee from the department
//       const departmentId = employee.departement;
//       if (departmentId) {
//         const department = await Departement.findById(departmentId);
//         if (department) {
//           department.employeId = department.employeId.filter(eId => eId.toString() !== id.toString());
//           await department.save();
//         }
//       }
  
//       // Delete the employee from the database
//       await Employe.findByIdAndRemove(id);
  
//       res.json({ message: "Employee deleted successfully." });
  
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Something went wrong" });
//     }
//   }
// exports.deleteEmploye = async (req, res) => {
//     const { id } = req.params;
//    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No departement with id: ${id}`);
//     try {
//         await Employe.findByIdAndRemove(id);
//         res.json({ message: "Employe deleted successfully." });
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
//   };
exports.deleteEmploye = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employe.findById(id);
        if (!employee) {
            return res.status(404).send(`No employee with id: ${id}`);
        }
        
        await employee.remove();
        res.json({ message: "Employe deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// delete multiple employes
exports.deleteEmployes = async (req, res) => {
    const { ids } = req.body;
    await Employe.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Employes deleted successfully." });
}

// create an employe and add it to the departement
exports.createEmployeAndAddToDepartement = async (req, res) => {

    const departmentName = req.body.departement

    const newEmploye = new Employe({
        fullname: req.body.fullname,
        picture: req.body.picture,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        role: req.body.role,
        salary: req.body.salary,
        jobtitle: req.body.jobtitle,
        jobtype: req.body.jobtype,
        departement: req.body.departement,
        firstday: req.body.firstday,
        lastday: req.body.lastday,
        dateofbirth: req.body.dateofbirth
    });


    try {
        const dep = await Departement.findOne({ name: departmentName })
        console.log("2"+ departmentName)
        await newEmploye.save().then((doc)=>{
           
            dep.employeId.push(doc._id)
             dep.save();
            res.status(201).json(doc);
        });
       
     
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

