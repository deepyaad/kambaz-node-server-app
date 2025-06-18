import express from 'express';
import Hello from "./Hello.js"
import Lab5 from "./lab5/index.js";
import UserRoutes from './kambaz/users/routes.js';
import CourseRoutes from "./kambaz/courses/routes.js";
import ModuleRoutes from "./kambaz/modules/routes.js";
import AssignmentRoutes from './kambaz/assignments/routes.js';
import cors from 'cors';
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);


console.log({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  NETLIFY_URL: process.env.NETLIFY_URL,
  NODE_SERVER_DOMAIN: process.env.NODE_SERVER_DOMAIN,
});



const app = express()


app.use(
 cors({
   credentials: true,
   origin: process.env.NETLIFY_URL || "http://localhost:5173",
 })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "lax", // changed from none
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(
  session(sessionOptions)
);
app.use(express.json());

Hello(app)
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
app.get("/env", (req, res) => {
 res.send(process.env);
});

app.listen(process.env.PORT || 4000)
