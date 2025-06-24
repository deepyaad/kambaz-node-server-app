import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
    status: "ENROLLED",
    enrollmentDate: new Date(),
  };
  return model.create(newEnrollment);
}

export function unenrollUserInCourse(userId, courseId) {
  return model.deleteOne({ user: userId, course: courseId });
}

export function findAllEnrollments() {
  return model.find();
}
