

import express from "express";
import taskController from "../controllers/task.contoller.js";

const router = express.Router();

// Set headers to allow CORS

router.post("/api/tasks/", taskController.createTask);
router.get("/api/tasks/all",taskController.getTasks);
router.get("/api/tasks/:id", taskController.getTaskById);
router.put("/api/tasks/:id", taskController.updateTask);
router.delete("/api/tasks/:id", taskController.deleteTask);
router.get('/api/projects/:projectId/tasks', taskController.getTasksByProjectId);

export default router;