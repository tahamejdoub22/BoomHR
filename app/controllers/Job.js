import Job from "../models/Job.js";
import Formulaire from "../models/Formulaire.js";
export function save(req , res)
{
    console.log(req.body.Permis)
    const job = new Job (req.body)
    job.save().then((job) => res.json(job)).catch((err) => console.log(err));
}

export async function filter(req, res) {
    try {
        const candidate = await Formulaire.findOne({ Email: req.body.email });
        console.log(candidate);
        console.log(candidate.domain);
        const domainRegex = new RegExp(candidate.Domain.trim(), 'i');
        const jobs = await Job.find({
            $or: [
                { domain: { $regex: domainRegex } },
                { competences: { $elemMatch: { $in: candidate.Competances.split(',') } } }
            ]
        });

        jobs.sort((a, b) => {
            const aCompetences = a.competences || '';
            const bCompetences = b.competences || '';

            const aMatchingSkills = aCompetences.split(',').filter(skill => candidate.Competances.includes(skill)).length;
            const bMatchingSkills = bCompetences.split(',').filter(skill => candidate.Competances.includes(skill)).length;

            if (aMatchingSkills > bMatchingSkills) return -1;
            if (aMatchingSkills < bMatchingSkills) return 1;
            return 0;
        });

        console.log('Jobs sorted:', jobs);
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getAll(req , res)
{
    const jobs = await Job.find()
     res.status(200).json(jobs)
}





