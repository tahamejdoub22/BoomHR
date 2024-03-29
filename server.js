import authRoutes from "./app/routes/auth.routes.js";
import congeeRoutes from "./app/routes/Congee.js";
import cookieSession from "cookie-session";
import cors from "cors";
import db from "./app/models/index.js";
import employeeRoutes from "./app/routes/Epmloyee.js";
import express, { json, urlencoded } from "express";
import userRoutes from "./app/routes/user.routes.js";
import { WebSocketServer } from "ws";
import { DB, HOST, PORT as _PORT } from "./app/config/db.config.js";
import { IncomeTaxRoute } from "./app/routes/IncomeTaxRouts.js";
import { attendanceRoutes } from "./app/routes/attendanceRoutes.js";
import { benefitRoute } from "./app/routes/benefitRoute.js";
import { PayrollRoute } from "./app/routes/payrollroutes.js";

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
app.use('/employee',employeeRoutes);
app.use('/congee',congeeRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/tax',IncomeTaxRoute)
app.use('/benefit',benefitRoute)
app.use('/payroll',PayrollRoute)
const wsServer = new WebSocketServer({ noServer: true });
wsServer.on("connection", ws => {
  console.log("WebSocket client connected");
  
  // handle WebSocket message
  ws.on("message", message => {
    console.log(`Received message: ${message}`);
  });

  // handle WebSocket disconnection
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

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
