

const config = require("../config/auth.config");
const db = require("../models");

const Departement = require("../models/departement.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// get all departements
exports.getDepartements = async (req, res) => {
  try {
      const departements = await Departement.find();
      res.status(200).json(departements);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }

};


  // add one departement
  exports.createDepartement = async (req, res) => {
   console.log("1");
    try {
      const newDepartement = new Departement({
        name: req.body.name,
        description: req.body.description,
        employeId:req.body.employeId,
        chefId:req.body.chefId,
       
      });
        await newDepartement.save();
        res.status(201).json(newDepartement);
    } catch (error) {
      console.log
      ("here" + error)
        res.status(409).json({ message: error.message });
    }
  };
  
  // delete one departement
  exports.deleteDepartement = async (req, res) => {
    const { id } = req.params;
   // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No departement with id: ${id}`);
    try {
        await Departement.findByIdAndRemove(id);
        res.json({ message: "Departement deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
  };
  // get one departement by ID
exports.getDepartementById = async (req, res) => {
  const { id } = req.params;
  try {
    const departement = await Departement.findById(id);
    if (!departement) {
      return res.status(404).json({ message: 'Departement not found' });
    }
    res.status(200).json(departement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update one departement by ID
exports.updateDepartementById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDepartement = await Departement.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDepartement) {
      return res.status(404).json({ message: 'Departement not found' });
    }
    res.status(200).json(updatedDepartement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
