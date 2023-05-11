import express from "express";

import {postStatusOnce,getStatus,getStatusIdByName,updateJobStatus,updateJobStatusToClosed} from '../controllers/status.js'

const router = express.Router();


router
    .route("/add")
    .post( postStatusOnce);

router
.route("/jobs-by-status/:statusId")
.get(getStatus)
    

router
    .route("/:name")
    .get( getStatusIdByName);


    router
    .route("/:jobId/:statusId")
    .post( updateJobStatus);

    router
    .route("/:jobId")
    .post( updateJobStatusToClosed);

    // router
    // .route("/op/:jobId")
    // .post( updateJobStatusToOpened);

export default router;