import express from "express";

import {getJobByStatus,addJob,getAllJobsee,deleteJob,updateJob,affectCanIdtoJobId,getCandidatesForJob,getTopCandidatesForJob,getDepartments,getJobById} from '../controllers/job.js'

const router = express.Router();


router
    .route("/add")
    .post( addJob);


router
.route("/")
.get( getAllJobsee);

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

router.route('/:jobId')
.get(getJobById)

router.route('/:statusType')
.get(getJobByStatus)

router
.route('/departments')
.get(getDepartments)


// router.
// route('/candidates-by-department')
// .get( getCandidatesByDepartment);


export default router;