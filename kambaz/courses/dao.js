import Database from "../database/index.js";
import { v4 as uuidv4 } from "uuid";




export function deleteCourse(courseId) {
  const { courses, enrollments } = Database;
  Database.courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
);}

export function findAllCourses() {
  return Database.courses;
}
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  Database.courses = [...Database.courses, newCourse];
  return newCourse;
}

export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  Object.assign(course, courseUpdates);
  return course;
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