import express from "express";

import {getCandidatesByDepartment,GetDapartemts,GetVacancies,GetVacanciesByDepartement} from '../controllers/applications.js'

const router = express.Router();

router.
route('/candidates-by-department')
.get( getCandidatesByDepartment);


router.
route("/departments")
.get( GetDapartemts);

router.
route("/vacancies")
.get( GetVacancies);
router.
route("/vacanciesByDepartement")
.get( GetVacanciesByDepartement);

export default router;