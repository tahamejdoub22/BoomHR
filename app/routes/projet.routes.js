

import express from "express";
import { createProject, getProjects, getProjectById, updateProject, deleteProject, assignProjectManager, addTeamMember } from "../controllers/projet.js";


const router = express.Router();



router.post('/project/create', createProject);
router.get('/project/all', getProjects);
router.get('/project/:id', getProjectById);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);
router.put('/project/:id/assign-manager', assignProjectManager);
router.put('/project/:id/add-team-member', addTeamMember);

export default router;
