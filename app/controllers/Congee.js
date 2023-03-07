import Congee from "../models/Congee.js";
import Employee from "../models/Employee.js";
import Entrprise from "../models/Entrprise.js";
import mongoose from "mongoose";

// access Types from the mongoose object
const { Types } = mongoose;
const { ObjectId } = Types;

export async function add(req, res) {
   // const employeeId = ObjectId(req.body.id);
    const congee = new Congee({
        Employee_id: '63f62662d76692b05dad501e',
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin,
        note: req.body.note,
        type: req.body.type
    });

    Employee.findById('63f62662d76692b05dad501e').then(async (emp) => {
        if (!emp) {
            return res.status(404).json({ message: "employee n'existe pas " });
        } else {
            congee.save().then((congee) => res.json(congee)).catch((err) => console.log(err));
        }
    });
}
