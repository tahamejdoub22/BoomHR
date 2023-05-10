import express from "express";
import taskController from "../controllers/task.contoller.js";

const router = express.Router();

// Set headers to allow CORS

router.post("/create", taskController.createTask);
router.get("/all",taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.get('/:projectId/tasks', taskController.getTasksByProjectId);

export default router;