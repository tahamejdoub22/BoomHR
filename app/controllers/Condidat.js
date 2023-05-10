import Condidat from "../models/Condidat.js";

export function save(req , res)
{

    const forum = new Condidat (req.body)
    forum.save().then((forum) => res.json(forum)).catch((err) => console.log(err));
}
export async function login(req, res) {
    const condidate = await Condidat.findOne({email: req.body.email})

    if(!condidate)
    {
        res.status(404).json({err:'user note found '})
    }
    else
        if(condidate.password === req.body.password)
            res.status(200).json(condidate)
    else
            res.status(405).json({err:'password incorrect'})

}
