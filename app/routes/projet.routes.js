import express from "express";
import { addTeamMember, assignProjectManager, createProject, deleteProject, getProjectById, getProjects, getProjectss, updateProject } from "../controllers/projet.js";

const router = express.Router();



router.post('/create', createProject);
router.get('/all', getProjects);
router.get('/alls', getProjectss);

router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.put('/:id/assign-manager', assignProjectManager);
router.put('/:id/add-team-member', addTeamMember);

export default router;