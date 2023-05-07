import express from "express";

import {getCandidatesByDepartment} from '../controllers/applications.js'

const router = express.Router();

router.
route('/candidates-by-department')
.get( getCandidatesByDepartment);


export default router;