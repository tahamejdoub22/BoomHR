import Departement from "../models/departement.model.js";

// get all departements
export const getDepartements = async (req, res) => {
  try {
    const departements = await Departement.find();
    res.status(200).json(departements);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


  
const createDepartement = async (req, res) => {
  try {
    const { name, description, employeId = [], chefId = "" } = req.body;
    const newDepartement = new Departement({ name, description, employeId, chefId });
    await newDepartement.save();
    res.status(201).json(newDepartement);
  } catch (error) {
    console.log("here" + error);
    res.status(409).json({ message: error.message });
  }
};

export { createDepartement };

  const deleteDepartement = async (req, res) => {
    const { id } = req.params;
    try {
      await Departement.findByIdAndRemove(id);
      res.json({ message: "Departement deleted successfully." });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  
  export { deleteDepartement };

const getDepartementById = async (req, res) => {
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

export { getDepartementById };


const updateDepartementById = async (req, res) => {
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

export { updateDepartementById };