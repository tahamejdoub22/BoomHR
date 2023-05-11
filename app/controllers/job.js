import Candidate from "../models/candidate.js";
import Job from "../models/job.js";
import Application from '../models/applications.js';

import Status from '../models/status.js';




export function getJobById (req, res)  {
  const jobId = req.params.id;
  Job.findById(jobId)
    .then(job => {
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json(job);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send('Server error');
    });
};

//post job with default status "opened"

export function postJob(req, res) {
  const {
    jobTitle,
    jobDomain,
    address,
    hiringLead,
    skillsRequired,
    department,
    postedDate,
    // applicants,
    vacancies,
    verified,
  } = req.body;

  if (!jobTitle || !jobDomain || !address || !hiringLead || !skillsRequired) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  Status.findOne({ name: "opened" })
    .then((openedStatus) => {
      if (!openedStatus) {
        return res.status(500).json({ error: "Could not find 'opened' status" });
      }

      const newJob = new Job({
        jobTitle,
        jobDomain,
        address,
        hiringLead,
        skillsRequired,
        department,
        postedDate,
        // applicants,
        vacancies,
        verified,
        jobStatus: {
          name: openedStatus.name, // Set the name property to "opened"
          _id: openedStatus._id, // Set the _id property to the ID of the openedStatus object
        },
      });

      newJob.save()
        .then((savedJob) => {
          const responseJob = {
            ...savedJob._doc,
            jobStatus: savedJob.jobStatus.name, // Include the name property in the response
          };
          res.status(201).json(responseJob);
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}
//geting the list of jobs 
// export function getAllJobs(req, res) {
//     job.find({})
//     .then((job) => {
//       res.send(job);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send('Erreur lors de la récupération des données');
//     });
//   }
  
/*
  export function  getAllJobsee (req, res) {
    Job.find()
   .populate({ path: 'candidates', select: 'name' })
      .populate({ path: '', select: 'name' })


    // .populate({
    //   path: 'jobApplications', 
    //   populate: { path: 'candidate', select: 'name' }
    // })
     //.populate("candidates","name")

     //.populate("jobApplications","")
      //.populate("candidates")
      .then((jobs) => {
        // res.status(200).json(jobs);
        // console.log("aaaa"+ jobs)
        const modifiedJobs = jobs.map((job) => {
          return {
            ...job._doc,
           // candidates: job.candidates.map((candidate) => candidate.name)
           candidates: job.candidates.length

          }
        });
        res.status(200).json(modifiedJobs);

      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  };*/

  export function getAllJobsee (req, res) {
    Job.find()
      .populate({ path: 'candidates', select: 'name' })
      .populate({ path: 'jobStatus', select: 'name' })
      .then((jobs) => {
        const modifiedJobs = jobs.map((job) => {
          return {
            ...job._doc,
            candidates: job.candidates.length,
            jobStatus: job.jobStatus.name// use the name of the jobStatus
          }
        });
        res.status(200).json(modifiedJobs);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  };
  //add and update
  
  
  export function addJob (req, res) {
    // if (!validationResult(req).isEmpty()) {
    //     res.status(400).json({ errors: validationResult(req).array() });
    //   } else {
    //  Status.findOne({ name: 'Opened' }).then(defaultStatus => {
        Job.create({
          jobTitle: req.body.jobTitle,
          jobDomain: req.body.jobDoamin,
          address: req.body.address,
          hiringLead: req.body.hiringLead,
          postedDate: req.body.postedDate,
          department: req.body.department,
          vacancies: req.body.vacancies,
          verified: req.body.verified,
          jobStatus: req.body.jobStatus,
        }).then(newJob => {
          newJob.populate('jobStatus', 'name', (err, populatedJob) => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              res.status(200).json({
                jobTitle: populatedJob.jobTitle,
                jobDomain: populatedJob.jobDomain,
                address: populatedJob.address,
                hiringLead: populatedJob.hiringLead,
                postedDate: populatedJob.postedDate,
                department: populatedJob.department,
                vacancies: populatedJob.vacancies,
                verified: populatedJob.verified,
                jobStatus: populatedJob.jobStatus.name
              });
            }
          });
        }).catch(err => {
          console.log("aaaaaa")
          res.status(500).json({ error:err.message  });
        });
      // }).catch(err => {
      //   console.log("eeee")
      //   res.status(500).json({ error: err });
     // });
  };
//update Job BYID

export function updateJob (req, res) {
  const { id } = req.params;
  const { jobTitle, jobDomain, address, hiringLead,skillsRequired,postedDate,department,status,vacancies,verified } = req.body;

  // Find the job by ID
  Job.findById(id)
    .then((job) => {
      // Update the user information
      job.jobTitle = jobTitle;
      job.jobDomain = jobDomain;
      job.address = address;
      job.hiringLead = hiringLead;
      job.skillsRequired = skillsRequired;
      job.postedDate = postedDate;
      job.department = department;
      job.status = status;
      job.vacancies=vacancies,
      job.verified=verified

      return job.save();
    })
    .then((updatedJob) => {
      res.json(updatedJob);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
};



  export function deleteJob(req, res) {
    const jobId = req.params.id;
      Job.findOneAndDelete({ _id: jobId })
      .then(deletedJob => {
        console.log(deletedJob)
        if (deletedJob) {
          res.status(200).json({ message: 'Job deleted', job: deletedJob });
        } else {
          res.status(404).json({ message: 'Job not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal server error', error: err });
      });
  }
  /*

  export function addJob(req, res) {
    const { candidates, ...jobData } = req.body;
  
    job.create(jobData)
      .then(job => {
        if (candidates && candidates.length > 0) {
          // Add the candidate(s) to the job object's candidates array
          let candidatePromises = candidates.map(candidateId => {
            return candidate.findById(candidateId).exec();
          });
          Promise.all(candidatePromises)
            .then(candidates => {
              candidates.forEach(candidate => {
                if (candidate) {
                  job.candidates.push(candidate);
                }
              });
              job.save()
                .then(() => {
                  res.status(200).json(job);
                })
                .catch(error => {
                  res.status(500).json({ error: error.message });
                });
            })
            .catch(error => {
              res.status(500).json({ error: error.message });
            });
        } else {
          job.save()
            .then(() => {
              res.status(200).json(job);
            })
            .catch(error => {
              res.status(500).json({ error: error.message });
            });
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }
  */

  //-----------------------------------------------------------------------
  //i work with this function 
  export function affectCanIdtoJobId(req,res){
    const { candidateId, jobId } = req.params;
    Application.findOne({ job: jobId, candidate: candidateId })
    .then((existingApplication) => {
      if (existingApplication) {
        console.log(`Application ${existingApplication._id} already exists`);
        res.json ("Application already exists")
        return existingApplication;
      } else {
    Promise.all([
      Candidate.findById(candidateId),
      Job.findById(jobId),
    ]).then(([candidate, job]) => {
      if (!candidate) {
        throw new Error(`No candidate found with ID ${candidateId}`);
      }
      if (!job) {
        throw new Error(`No job found with ID ${jobId}`);
      }
      const application = new Application({
        candidate: candidateId,
        job: jobId,
        status: 'applied'
      });
      return Promise.all([
        application.save(),
        Job.updateOne({_id: jobId}, {$push: {jobApplications: application._id, candidates: candidateId}}),
        Candidate.updateOne({_id: candidateId}, {$push: {applicationId: application._id, jobs: jobId}})
      ]);
    }).then(([savedApplication]) => {
      console.log(`Application ${savedApplication._id} created successfully`);
      res.status(201).send(savedApplication);
    }).catch(error => {
      console.error(`Error creating application: ${error.message}`);
      res.status(500).send({ error: error.message });
    });
  }
})
.catch((error) => {
  console.error(`Error finding existing application: ${error.message}`);
  res.status(500).send({ error: error.message });
});
}

// I DIDN T WORK WITH THIS !!
export async function getCandidatesForJob (req,res){

  try {

    // const jobId = new mongoose.Types.ObjectId(req.params.jobId);

    const jobIdd = req.params.jobIdd;
    const job = await Job.findById( jobIdd).populate('candidates');

    // const job = await Job.findById({ jobId: jobId }).populate('candidateId');
  
    if (!job) {
      return res.status(404).send({ error: `Job with ID ${jobId} not found` });
    }
  
    const candidatess = job.candidates;
    console.log(candidatess);

    const uniqueCandidates = candidatess.filter((candidate, index, self) =>
      index === self.findIndex(c => (
        c._id.toString() === candidate._id.toString() && candidate.jobs.includes(jobIdd)
      ))
    );
    console.log(jobIdd);

    res.send(uniqueCandidates);
  } catch (error) {
    console.error(`Error fetching candidates for job: ${error.message}`);
    res.status(500).send({ error: 'Failed to fetch candidates for the job.' });
  }
}
export function getTopCandidatesForJob(req, res) {
  const jobId = req.params.jobIdd;

  Job.findOne({ _id: jobId })
    .populate("candidates")
    .then((foundJob) => {
      console.log("Found job:", foundJob);
      if (!foundJob) {
        return res.status(404).send({ error: "Job not found" });
      }

      const requiredSkills = foundJob.skillsRequired
        .toLowerCase()
        .split(/[, ]+/);
      console.log("Required skills:", requiredSkills);

      const candidateIds = foundJob.candidates.map((candidate) => candidate._id);

      Candidate.find({
        _id: { $in: candidateIds },
        $or: requiredSkills.map((skill) => ({
          skills: { $regex: new RegExp(skill, "i") },
        })),
      })
        .then((candidates) => {
          console.log("Found candidates:", candidates);

          const topCandidates = candidates.map((candidate) => {
            let matchScore = 0;

            const candidateSkills = candidate.skills
              .toLowerCase()
              .split(/[, ]+/);

            candidateSkills.forEach((skill) => {
              if (requiredSkills.includes(skill)) {
                matchScore++;
              }
            });

            return {
              _id: candidate._id,
    
              candidate: candidate,
              matchScore: matchScore,
            };
          });

          topCandidates.sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
              return b.matchScore - a.matchScore;
            } else {
              // If two candidates have the same matchScore, sort them alphabetically by name
              return a.candidate.name.localeCompare(b.candidate.name);
            }
          });

          if (topCandidates.length > 10) {
            // Check if there are more than 10 candidates with the same highest matchScore
            const highestScore = topCandidates[0].matchScore;
            let numOfHighestScore = 1;
            for (let i = 1; i < topCandidates.length; i++) {
              if (topCandidates[i].matchScore === highestScore) {
                numOfHighestScore++;
              } else {
                break;
              }
            }

            if (numOfHighestScore > 10) {
              topCandidates.splice(10, topCandidates.length - 10);
            }
          }

          res.send(topCandidates.slice(0, 10));
        })
        .catch((error) => {
          console.error(`Error fetching candidates for job: ${error.message}`);
          res.status(500).send({ error: error.message });
        });
    })
    .catch((error) => {
      console.error(`Error fetching job: ${error.message}`);
      res.status(500).send({ error: error.message });
    });
}

//this function is to retrive the candidayes taht matches welle the job even they applied or not for the job 
/*export function getTopCandidatesForJob(req, res) {
  const jobIdd = req.params.jobIdd;

  Job.findById(jobIdd)
    .then(foundJob => {
      console.log("aaaaa"+foundJob)
      if (!foundJob) {
        return res.status(404).send({ error: "Job not found" });
      }

      const requiredSkills = foundJob.skillsRequired.toLowerCase().split(/[, ]+/);;
     const domainRegex = new RegExp(foundJob.domain, "i");
     console.log("Required skills:", requiredSkills);

      Candidate.find({
          $or: [
            { domain: { $regex: domainRegex } },
              { skills: { $all: requiredSkills } }
          ]
          // $and: requiredSkills.map(skill => ({ skills: { $regex: new RegExp(skill, "i") } }))

      })
        .then(candidatess => {
          console.log("Found candidates:", candidatess);

          const topCandidates = candidatess.map(candidate => {
            let matchScore = 0;

            const candidateSkills = candidate.skills.toLowerCase().split(/[, ]+/);;

            candidateSkills.forEach(skill => {
              if (requiredSkills.includes(skill)) {
                matchScore++;
              }
            });

            return {
              candidate: candidate,
              matchScore: matchScore
            };
          });

          topCandidates.sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
              return b.matchScore - a.matchScore;
            } else {
              // If two candidates have the same matchScore, sort them alphabetically by name
              return a.candidate.name.localeCompare(b.candidate.name);
            }
          });

          if (topCandidates.length > 10) {
            // Check if there are more than 10 candidates with the same highest matchScore
            const highestScore = topCandidates[0].matchScore;
            let numOfHighestScore = 1;
            for (let i = 1; i < topCandidates.length; i++) {
              if (topCandidates[i].matchScore === highestScore) {
                numOfHighestScore++;
              } else {
                break;
              }
            }

            if (numOfHighestScore > 10) {
              topCandidates.splice(10, topCandidates.length - 10);
            }
          }

          res.send(topCandidates.slice(0, 10));
        })
        .catch(error => {
          console.error(`Error fetching candidates for job: ${error.message}`);
          res.status(500).send({ error: error.message });
        });
    })
    .catch(error => {
      console.error(`Error fetching job: ${error.message}`);
      res.status(500).send({ error: error.message });
    });
}*/



export async function  getDepartments  (req, res)  {
  try {
    const departments = await Job.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $project: { _id: 0, name: '$_id', count: 1 } }
    ]);
    const departmentNames = departments.map(department => department.name);
    res.json(departmentNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving departments' });
  }
};
/*
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
};*/