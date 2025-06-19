import * as gradesDao from "./dao.js";

export default function GradeRoutes(app) {
  app.get("/api/users/:userId/courses/:courseId/grades", async (req, res) => {
    const { userId, courseId } = req.params;
    try {

      let actualUserId = userId;
      if (actualUserId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser || !currentUser._id) {
          res.status(401).json({ message: "Unauthorized: No current user in session." });
          return;
        }
        actualUserId = currentUser._id;
      }

      const grades = await gradesDao.findGradesForUserAndCourse(actualUserId, courseId);
      res.json(grades);
    } catch (error) {
      console.error("Error fetching grades for user and course:", error);
      res.status(500).json({ message: "Failed to fetch grades", error: error.message });
    }
  });


}