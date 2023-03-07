import { signin, signout, signup } from "../controllers/auth.controller.js";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/verifySignUp.js";

export default function authRoutes(app) {
  app.use(function(_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      checkDuplicateUsernameOrEmail,
      checkRolesExisted
    ],
    signup
  );

  app.post("/api/auth/signin", signin);

  app.post("/api/auth/signout", signout);
};
