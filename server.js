import applicationsRoutes from "./app/routes/applications.js";
import authRoutes from "./app/routes/auth.routes.js";
import candidateRoutes from "./app/routes/candidate.js";
import condidatRoutes from "./app/routes/Condidat.js";
import congeeRoutes from "./app/routes/Congee.js";
import cookieSession from "cookie-session";
import cors from "cors";
import db from "./app/models/index.js";
import departementRoutes from "./app/routes/departement.routes.js";
import employeeRoutes from "./app/routes/Epmloyee.js";
import employerRoutes from "./app/routes/employer.routes.js";
import express, { json, urlencoded } from "express";
import formulaireRoutes from "./app/routes/Formulaire.js";
import jobRoutes from "./app/routes/Job.js";
import jobRoutess from "./app/routes/Job1.js";
import postRoutes from "./app/routes/Post.js";
import projetRoutes from "./app/routes/projet.routes.js";
import satatusRoutes from "./app/routes/status.js";
import status from "./app/models/status.js";
import taskRoutes from "./app/routes/task.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import userRoutess from "./app/routes/user.js";
import { DB, HOST, PORT as _PORT } from "./app/config/db.config.js";
import { IncomeTaxRoute } from "./app/routes/IncomeTaxRouts.js";
import { attendanceRoutes } from "./app/routes/attendanceRoutes.js";
import { benefitRoute } from "./app/routes/benefitRoute.js";
import { PayrollRoute } from "./app/routes/payrollroutes.js";
import { salaryRoutes } from "./app/routes/salaryRoute.js";

import satatuscanRoutes from  "./app/routes/statuscan.js";

const app = express();

var corsOptions = {

  origin: ["http://localhost:4200"],
  credentials: true
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "BoomHr-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const Role = db.role;

db.mongoose
  .connect(`mongodb://${HOST}:${_PORT}/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
// routes

authRoutes(app);
userRoutes(app);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
  }));
  app.use('/users', userRoutess);
 
app.use('/employee',employeeRoutes);
app.use('/congee',congeeRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/salary',salaryRoutes)
app.use('/tax',IncomeTaxRoute)
app.use('/benefit',benefitRoute)
app.use('/payroll',PayrollRoute)
app.use('/formulaire',formulaireRoutes);
app.use('/condidat',condidatRoutes),
app.use('/job',jobRoutes)
app.use('/post',postRoutes)
app.use('/employer',employerRoutes)
app.use('/departement',departementRoutes)
app.use('/project',projetRoutes)
app.use('/task',taskRoutes)
app.use('/jobs', jobRoutess);
app.use('/candidas', candidateRoutes);
app.use('/applications', applicationsRoutes);
app.use('/status', satatusRoutes);
app.use('/statuscan', satatuscanRoutes);
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "HrManager"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'HrManager' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
