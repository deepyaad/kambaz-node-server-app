import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export function deleteAssignment(assId) {
 const { assignments } = Database;
 Database.assignments = assignments.filter((assignment) => assignment._id !== assId);
}


export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function updateAssignment(assId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find((assignment) => assignment._id === assId);
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}