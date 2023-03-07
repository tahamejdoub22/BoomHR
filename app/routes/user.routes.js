import  authJwt  from "../middlewares/authJwt.js";
import { HrManagerBoard, adminBoard, allAccess, userBoard } from "../controllers/user.controller.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], userBoard);

  app.get(
    "/api/test/HrManager",
    [authJwt.verifyToken, authJwt.isHrManger],
    HrManagerBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );
};
