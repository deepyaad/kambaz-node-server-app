import * as dao from "./dao.js";
import * as courseDao from "../courses/dao.js";
import * as enrollmentsDao from "../enrollments/dao.js";

export default function UserRoutes(app) {

  const findCoursesForUser = async (req, res) => {
   const currentUser = req.session["currentUser"];
   if (!currentUser) {
     res.sendStatus(401);
     return;
   }
   if (currentUser.role === "ADMIN") {
     const courses = await courseDao.findAllCourses();
     res.json(courses);
     return;
   }
   let { uid } = req.params;
   if (uid === "current") {
     uid = currentUser._id;
   }
   const courses = await enrollmentsDao.findCoursesForUser(uid);
   res.json(courses);
 };
 app.get("/api/users/:uid/courses", findCoursesForUser);

  
  // Create a course and enroll current user
  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).json({ message: "Not logged in" });
    }
    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);

  // Create user
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);

  // Delete user
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  app.delete("/api/users/:userId", deleteUser);

  // Find all users (with optional filters)
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };
  app.get("/api/users", findAllUsers);


  // Find user by ID
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  // Update user
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);

    // Sync session if updating the logged-in user
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }

    res.json({ status: "updated" });
  };
  app.put("/api/users/:userId", updateUser);

  // Signup
  const signup = async (req, res) => {
    const existingUser = await dao.findUserByUsername(req.body.username);
    if (existingUser) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  app.post("/api/users/signup", signup);

  // Signin
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  };
  app.post("/api/users/signin", signin);

  // Signout
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  app.post("/api/users/signout", signout);

  // Profile
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
    } else {
      res.json(currentUser);
    }
  };
  app.post("/api/users/profile", profile);


  app.get("/api/users/:userId", findUserById);

}
