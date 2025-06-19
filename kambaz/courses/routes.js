import * as dao from "./dao.js";
import * as courseDao from "../courses/dao.js";
import * as modulesDao from "../modules/dao.js";
import * as assignmentsDao from "../assignments/dao.js"
import * as quizzesDao from "../quizzes/dao.js";

export default function CourseRoutes(app) {
  
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  });

  app.post("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = quizzesDao.createQuiz(quiz);
    res.send(newQuiz);
  });
  
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.get("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const quizzes = quizzesDao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  });
  
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });
  
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

app.post("/api/users/:userId/courses/:courseId/enroll", (req, res) => {
  const { courseId } = req.params;
  const { userId, action } = req.body;

  try {
    courseDao.updateCourseEnrollment(courseId, userId, action);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



}

