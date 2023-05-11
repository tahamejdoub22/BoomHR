import express from "express";

import {postCannn,getCandidatesWithJobRole,addCan,updateCandidate,sendemailtoMeet,deleteCandidate,sendAcceptedEmail,sendRejectedEmail} from '../controllers/candidate.js'

const router = express.Router();



router
    .route("/")
    .post( addCan);

    router
    .route("/post")
    .post( postCannn);
    
router
.route("/")
.get( getCandidatesWithJobRole);

router
.route('/:id',)
.put( updateCandidate);

router
.route("/delete/:id")
.delete( deleteCandidate);
router
.route("/send-email/:id")
.post( sendemailtoMeet);

router
.route('/accept/:id')
.put(sendAcceptedEmail);

router
.route('/reject/:id')
.put(sendRejectedEmail);

export default router;