import Congee from "../models/Congee.js";
import Employee from "../models/Employee.js";
import Entrprise from "../models/Entrprise.js";
import mongoose from "mongoose";

// access Types from the mongoose object
const { Types } = mongoose;
const { ObjectId } = Types;



export async function add(req, res) {
    const employeeId = ObjectId(req.body.id);
    const congee = new Congee({
        Employee_id: employeeId,
        date_debut: req.body.startDate,
        date_fin: req.body.endDate,
        note: req.body.note,
        type: req.body.type
    });

    Employee.findById(employeeId).then(async (emp) => {
        if (!emp) {
            return res.status(404).json({ message: "employee n'existe pas " });
        } else {
            congee.save().then((congee) => res.json(congee)).catch((err) => console.log(err));
        }
    });
}

export async function get(req, res) {
    const employeeId = ObjectId(req.params.id);
    Congee.find({Employee_id:employeeId})
        .sort({createdAt: -1}) // Tri de la liste par ordre décroissant de création
        .limit(5) // Limitation de la liste aux 5 derniers éléments
        .then(async (emp) => {
            res.status(200).json(emp);
        });
}


export async function put(req, res) {
    const { _id, note, type } = req.body; // Récupérer les nouvelles données à mettre à jour
    const date_debut = req.body.startDate;
    const date_fin = req.body.endDate;

    const updateCongee = { date_debut, date_fin, note, type }; // Créer un objet contenant les propriétés à mettre à jour

    try {
      const updatedCongee = await Congee.findByIdAndUpdate(_id, updateCongee, { new: true }); // Mettre à jour le document et retourner le document mis à jour
      res.status(200).json(updatedCongee); // Envoyer le document mis à jour en réponse
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du congé.' });
    }
  }


  export async function getAll(req, res) {
    try {
        const conges = await Congee.find();
        const result = await Promise.all(conges.map(async (conge) => {
            const Empl = await Employee.findById(conge.Employee_id);
            console.log(conges)
            if (!Empl) {
                return null;
            } else {
                return {
                    _id: conge._id,
                    fullname: `${Empl.first_name.trim()} ${Empl.last_name.trim()}`,
                    date_debut: conge.date_debut,
                    date_fin: conge.date_fin,
                    note : conge.note,
                    type : conge.type,
                    etat : conge.etat

                    // ajoutez d'autres propriétés de Congee que vous souhaitez inclure dans le résultat
                };
            }
        }));
        res.json(result.filter(item => item !== null)); // filtre les éléments null du tableau
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function put2(req, res) {
  const { _id, bool } = req.body;

  console.log(bool)
  let etat;
  if (bool === true) {
    etat = 'approuvé';
  } else 
  if(bool==null)
  {
    etat = 'en cours';
  } else
  {
    etat = 'rejeté';
  }
  console.log(etat)

  const updateCongee = { etat };
  console.log(updateCongee)
  try {
    const updatedCongee = await Congee.findByIdAndUpdate(_id, updateCongee, { new: true });
    const diffInMs = Math.abs(updatedCongee.date_fin - updatedCongee.date_debut);
    const updatedEmployee = await Employee.findById(updatedCongee.Employee_id);
    // Convertir la différence en jours
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    let vacation;
    if (updatedCongee.type === "vacation") {
      vacation = updatedEmployee.vacation - diffInDays;
      const updateEmploye = { vacation };
      await Employee.findByIdAndUpdate(updatedCongee.Employee_id, updateEmploye, { new: true });
    } else {
      vacation = updatedEmployee.sick - diffInDays;
      const updateEmploye = { sick: vacation };
      await Employee.findByIdAndUpdate(updatedCongee.Employee_id, updateEmploye, { new: true });
    }
    res.status(200).json(updatedCongee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du congé.' });
  }
}
