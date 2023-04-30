const taskController = require("../controllers/task.contoller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

 
 app.post("/api/tasks/", taskController.createTask);
  app.get("/api/tasks/all",taskController.getTasks);
  app.get("/api/tasks/:id", taskController.getTaskById);
  app.put("/api/tasks/:id", taskController.updateTask);
  app.delete("/api/tasks/:id", taskController.deleteTask);
  app.get('/api/projects/:projectId/tasks', taskController.getTasksByProjectId);
};

// const express = require('express');
// const router = express.Router();
// const taskController = require("../controllers/task.contoller.js");

// router.post('/tasks', taskController.createTask);
// router.get('/tasks/:id', taskController.getTask);
// router.put('/tasks/:id', taskController.updateTask);
// router.delete('/tasks/:id', taskController.deleteTask);
// router.get('/projects/:id/tasks', taskController.getTasksByProject);
// router.get('/employers/:id/tasks', taskController.getTasksByOwner);

// module.exports = router;