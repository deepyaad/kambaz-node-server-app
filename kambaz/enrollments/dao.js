import model from "./model.js";

export async function findCoursesForUser(userId) {
  // Add .lean() to return plain JavaScript objects for populated 'course'
  const enrollments = await model.find({ user: userId }).populate("course").lean();
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  // Add .lean() to return plain JavaScript objects for populated 'user'
  const enrollments = await model.find({ course: courseId }).populate("user").lean();
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
  // These operations typically return the created/modified document,
  // which might still be a Mongoose document. If you're sending the *result*
  // of these directly back to the client, you might want to add .lean() or .toObject()
  // if you retrieve them after creation. For `create` and `deleteOne`, it's usually fine
  // as they return simpler objects/status.
  return model.create({ user, course, _id: `${user}-${course}` });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export const findAllEnrollments = () => model.find().lean(); // Also add .lean() here


/*

import model from "./model.js";

export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
 return model.create({ user, course, _id: `${user}-${course}` });
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}

export const findAllEnrollments = () => model.find();

*/