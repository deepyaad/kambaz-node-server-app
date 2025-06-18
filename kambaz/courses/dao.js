import { v4 as uuidv4 } from "uuid";
import model from "./model.js";  

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function findAllCourses() {
  return model.find();
}

export function createCourse(course) {
  return model.create(course);
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

export function findCoursesForEnrolledUser(userId) {
  const { enrollments, courses } = Database;
  const userEnrollments = enrollments.filter(
    (enrollment) => enrollment.user === userId
  );
  return userEnrollments.map((enrollment) =>
    courses.find((course) => course._id === enrollment.course)
  );
}

export function updateCourseEnrollment(courseId, userId, action) {
  const { enrollments } = Database;
  const enrollment = enrollments.find(
    (enrollment) => enrollment.course === courseId && enrollment.user === userId
  );

  if (action === "enroll") {
    if (!enrollment) {
      enrollments.push({ course: courseId, user: userId });
    }
  } else {
    if (enrollment) {
      Database.enrollments = enrollments.filter(
        (enrollment) => !(enrollment.course === courseId && enrollment.user === userId)
      );
    }
  }

  return null;
}
