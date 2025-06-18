import * as dao from "./dao.js"; // This should be `import * as enrollmentsDao from "./dao.js";` if your variable name is `enrollmentsDao`
                                // Or ensure consistency in naming. For now, I'll assume `dao`.

export default function EnrollmentsRoutes(app) {

  app.get("/api/enrollments", async (req, res) => { // Make this async
    try {
      const enrollments = await dao.findAllEnrollments(); // Await the promise
      res.json(enrollments); // Use res.json() for JSON data, it handles serialization
    } catch (error) {
      console.error("Error in GET /api/enrollments:", error);
      res.status(500).json({ message: "Internal Server Error", details: error.message });
    }
  });

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser || !currentUser._id) {
        return res.status(401).json({ message: "Unauthorized: No current user in session." });
      }
      uid = currentUser._id;
    }
    try {
      // dao.enrollUserInCourse returns a Mongoose document. Convert it to a plain object.
      const status = await dao.enrollUserInCourse(uid, cid);
      res.status(200).json(status.toObject()); // Use .toObject() here for the created document
    } catch (error) {
      console.error("Error in POST /api/users/:uid/courses/:cid (enroll):", error);
      res.status(500).json({ message: "Failed to enroll user in course", details: error.message });
    }
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser || !currentUser._id) {
        return res.status(401).json({ message: "Unauthorized: No current user in session." });
      }
      uid = currentUser._id;
    }
    try {
      // dao.unenrollUserFromCourse returns a simpler delete result object, which is usually safe.
      const status = await dao.unenrollUserFromCourse(uid, cid);
      res.status(200).json(status); // This should be fine as it's a plain JS object
    } catch (error) {
      console.error("Error in DELETE /api/users/:uid/courses/:cid (unenroll):", error);
      res.status(500).json({ message: "Failed to unenroll user from course", details: error.message });
    }
  };

  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);

}

/*

import * as dao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  
  app.get("/api/enrollments", (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.send(enrollments);
  });

  const enrollUserInCourse = async (req, res) => {
   let { uid, cid } = req.params;
   if (uid === "current") {
     const currentUser = req.session["currentUser"];
     uid = currentUser._id;
   }
   const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
   res.send(status);
 };

 const unenrollUserFromCourse = async (req, res) => {
   let { uid, cid } = req.params;
   if (uid === "current") {
     const currentUser = req.session["currentUser"];
     uid = currentUser._id;
   }
   const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
   res.send(status);
 };
 app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
 app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);

}

*/
