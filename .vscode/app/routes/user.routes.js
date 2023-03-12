const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/HrManager",
    [authJwt.verifyToken, authJwt.isHrManger],
    controller.HrManagerBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post("/api/test/forgotpassword", controller.forgotPassword);
  app.post("/api/test/resetpassword", controller.resetPassword);
  app.post("/api/test/verifyotp", controller.verifyOtp);
};
