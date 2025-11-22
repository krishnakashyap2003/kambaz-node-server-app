import express from "express";
import cors from "cors";
import session from "express-session";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

console.log("Starting server...");

const app = express();

console.log("Express app created");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

console.log("CORS configured");

app.use(
  session({
    secret: "kambaz",
    resave: false,
    saveUninitialized: false,
  })
);

console.log("Session configured");

app.use(express.json());

console.log("Setting up routes...");

UserRoutes(app);
console.log("UserRoutes loaded");

CourseRoutes(app);
console.log("CourseRoutes loaded");

ModuleRoutes(app);
console.log("ModuleRoutes loaded");

AssignmentRoutes(app);
console.log("AssignmentRoutes loaded");

EnrollmentRoutes(app);
console.log("EnrollmentRoutes loaded");

Lab5(app);
console.log("Lab5 loaded");

app.listen(4000, () => console.log("Server running on port 4000"));