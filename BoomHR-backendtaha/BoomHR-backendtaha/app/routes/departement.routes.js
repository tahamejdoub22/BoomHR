// //const { verifySignUp } = require("../middlewares");
// const controller = require("../controllers/department.js");

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, Content-Type, Accept"
//     );
//     next();
//   });

 
//   app.get("/api/auth/dep/", controller.getDepartements);
//   app.post("/api/auth/dep/add", controller.createDepartement);
  
//   app.delete("/api/auth/dep/:id", controller.deleteDepartement);
 
// };
//const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/department.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/auth/dep/", controller.getDepartements);
  app.post("/api/auth/dep/add", controller.createDepartement);
  app.get("/api/auth/dep/:id", controller.getDepartementById);
  app.delete("/api/auth/dep/:id", controller.deleteDepartement);
  app.put("/api/auth/dep/:id", controller.updateDepartementById);
};
