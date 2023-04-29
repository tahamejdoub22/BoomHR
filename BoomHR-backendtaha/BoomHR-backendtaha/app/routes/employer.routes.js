const controller = require("../controllers/employer.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

 
  app.get("/api/auth/emp/",controller.getEmployes);
  app.get("/api/auth/emp/:id", controller.getEmployerById);
 // app.get("/api/auth/emp/:id/profile", controller.getEmployeProfile);
  app.post("/api/auth/emp/add", controller.createEmployeAndAddToDepartement);
  app.patch("/api/auth/emp/:id", controller.updateEmploye);
  app.delete("/api/auth/emp/:id", controller.deleteEmploye);
  app.delete("/", controller.deleteEmployes);
};
