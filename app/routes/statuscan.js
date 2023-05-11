import express from "express";

import {postStatusOnce,getStatus} from '../controllers/statuscan.js'

const router = express.Router();


router
    .route("/add")
    .post( postStatusOnce);

router
.route("/cans-by-status/:statusId")
.get(getStatus)
    

export default router;