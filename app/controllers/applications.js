import Candidate from "../models/candidate.js";
import Job from "../models/job.js";
import Application from '../models/applications.js';

export function getCandidatesByDepartment(req, res) {
    Job.aggregate([
      // { $unwind: "$candidates" },
      // {
      //   $group: {
      //     _id: "$_id",
      //     department: { $addToSet: "$department" }
      //   }
      // },
      // { $unwind: "$department" },
      // {
      //   $group: {
      //     _id: "$department",
      //     count: { $sum: 1 }
      //   }
      // }
      //---------------
      // {
      //   $group: {
      //     _id: "$department",
      //     candidates: { $sum: { $size: "$candidates" } }
      //   }
      // },
      // {
      //   $match: {
      //     candidates: { $gt: 0 }
      //   }
      // }
      {
        $group: {
          _id: "$department",
          candidates: { $sum: { $size: "$candidates" } }
        }
      },
      {
        $match: {}
      }
    ])
    .exec()
    .then((departments) => {
      const modifiedDepartments = departments.map((dept) => {
        return {
          department: dept._id,
          candidates: dept.candidates
        }
      });
      res.status(200).json(modifiedDepartments);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
  }; 



export  async function GetDapartemts (req, res)  {
    try {
      const departments = await Job.distinct("department");
      res.status(200).json(departments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export  async function GetVacancies (req, res)  {
    try {
      const vacancies = await Job.distinct("vacancies");
      res.status(200).json(vacancies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };



  
  export async function GetVacanciesByDepartement (req, res)  {
    try {
      const vacanciesByDepartment = await Job.aggregate([
        {
          $group: {
            _id: "$department",
            vacancies: { $sum: "$vacancies" }
          }
        },
        {
          $project: {
            _id: 0,
            department: "$_id",
            vacancies: 1
          }
        }
      ]);
      res.status(200).json(vacanciesByDepartment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };