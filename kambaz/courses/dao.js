import { v4 as uuidv4 } from "uuid";
import courseModel from "./model.js";      
import enrollmentModel from "../enrollments/model.js";  

export function deleteCourse(courseId) {
  return courseModel.deleteOne({ _id: courseId });
}

export function findAllCourses() {
  return courseModel.find();
}

export function createCourse(course) {
  if (!course._id) course._id = uuidv4();
  return courseModel.create(course);
}

export function updateCourse(courseId, courseUpdates) {
  return courseModel.updateOne({ _id: courseId }, { $set: courseUpdates });
}


export async function findCoursesForEnrolledUser(userId) {
  const enrollments = await enrollmentModel.find({ user: userId });
  const courseIds = enrollments.map(e => e.course);
  return courseModel.find({ _id: { $in: courseIds } });
}

export async function updateCourseEnrollment(courseId, userId, action) {
  if (action === "enroll") {
    const existing = await enrollmentModel.findOne({ course: courseId, user: userId });
    if (!existing) {
      return enrollmentModel.create({ course: courseId, user: userId });
    }
  } else if (action === "unenroll") {
    return enrollmentModel.deleteOne({ course: courseId, user: userId });
  }
  return null;
}










