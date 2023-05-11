import express from "express";
import { addJob, affectCanIdtoJobId, deleteJob, getAllJobsee, getCandidatesForJob, getDepartments, getJobById, getTopCandidatesForJob, postJob, updateJob } from "../controllers/job.js";

const router = express.Router();

router
    .route("/post")
    .post( postJob);
router
    .route("/add")
    .post( addJob);


router
.route("/")
.get( getAllJobsee);

router
.route("/:id")
.get( getJobById);

router
.route("/delete/:id")
.delete( deleteJob);

router
.route('/:id',)
.put( updateJob);
//-------------------------------------------------------------------
router
.route('/:jobId/candidates/:candidateId')
.post(affectCanIdtoJobId)

router
.route('/:jobIdd/top-10-candidates')
.get( getTopCandidatesForJob);

// // dididnt work with hthis getCanforjob
router
.route('/:jobIdd/candidates')
.get(getCandidatesForJob)


router
.route('/departments')
.get(getDepartments)


// router.
// route('/candidates-by-department')
// .get( getCandidatesByDepartment);


export default router;