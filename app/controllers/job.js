import Candidate from "../models/candidate.js";
import Job from "../models/job.js";
import Application from '../models/applications.js';


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
  

  export function  getAllJobsee (req, res) {
    Job.find()
   .populate({ path: 'candidates', select: 'name' })

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
  };
  //add and update
  
  export function getJobById(req, res) {
    Job.findById(req.params.jobId)
    .populate('jobApplications candidates')
    .then((job) => {
      if (!job) {
        return res.status(404).send("Job not found");
      }
      res.send(job);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server error");
    });
  }

  export function getJobByStatus(req, res) {
    const { statusType } = req.params;
  Status.findOne({ type: statusType })
    .then(status => {
      if (!status) {
        return res.status(404).json({ error: `Status ${statusType} not found` });
      }
      Job.find({ jobStatus: status._id })
        .populate('jobStatus')
        .exec()
        .then(jobs => {
          return res.status(200).json(jobs);
        })
        .catch(err => {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    });
  }


  export function addJob (req, res) {
    // if (!validationResult(req).isEmpty()) {
    //     res.status(400).json({ errors: validationResult(req).array() });
    //   } else {
        Job.create({
          //candidates:req.body.candidates,
          jobApplications:req.body.jobApplications,
            jobTitle: req.body.jobTitle,
            jobDomain:req.body.jobDomain,
            address: req.body.address,
            hiringLead: req.body.hiringLead,
            posteddate: req.body.posteddate,
            department: req.body.department,
            vacancies: req.body.vacancies,
            status: req.body.status,
            verified: req.body.verified,
            skillsRequired: req.body.skillsRequired,

            


        })
          .then((newJob) => {
            res.status(200).json({
              //candidates:newJob.candidates,
              jobApplications:newJob.jobApplications,
              jobTitle: newJob.jobTitle,
              jobDomain:newJob.jobDomain,
              address: newJob.address,
              hiringLead: newJob.hiringLead,
              posteddate: newJob.posteddate,
              department: newJob.department,
              vacancies: newJob.vacancies,
              status: newJob.status,
              verified: newJob.verified,
              skillsRequired:newJob.skillsRequired

            });
            console.log(newJob)

          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
     // }
    
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
  const jobIdd = req.params.jobIdd;

  Job.findById(jobIdd)
    .then(foundJob => {
      console.log("aaaaa"+foundJob)
      if (!foundJob) {
        return res.status(404).send({ error: "Job not found" });
      }

      const requiredSkills = foundJob.skillsRequired.toLowerCase().split(/[, ]+/);;
      const domainRegex = new RegExp(foundJob.domain, "i");

      Candidate.find({
          $or: [
              { domain: { $regex: domainRegex } },
              { skills: { $in: requiredSkills } }
          ]
      })
        .then(candidatess => {
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
}



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