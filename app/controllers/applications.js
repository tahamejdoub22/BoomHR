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