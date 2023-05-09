import Formulaire from "../models/Formulaire.js";
export function save(req , res)
{
  console.log(req.body)
    //console.log(req.body.Domain)
    //console.log(req.body.Degree)
  const forum = new Formulaire (req.body)
 forum.save().then((forum) => res.status(200).json(forum)).catch((err) => console.log(err));
}
