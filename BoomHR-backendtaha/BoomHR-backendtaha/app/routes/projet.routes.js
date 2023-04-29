
const projectcontroller = require("../controllers/projet.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

 
  app.post("/api/project/create",projectcontroller.createProject);
  app.get("/api/project/all",projectcontroller.getProjects);
  app.get("/api/project/:id", projectcontroller.getProjectById);
  app.put("/api/project/:id",projectcontroller.updateProject);
  app.delete("/api/project/:id", projectcontroller.deleteProject);
  app.put("/api/project/:id/assign-manager",projectcontroller.assignProjectManager);
  app.put("/api/project/:id/add-team-member", projectcontroller.addTeamMember);// matemchich 
};
