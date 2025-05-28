import { v4 as uuidv4 } from "uuid";
import model from "./model";


export function deleteCourse(courseId) {
 return model.deleteOne({ _id: courseId });
}


export function findAllCourses() {
  return model.find();
}
export function createCourse(course) {
  return model.create(newCourse);
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

