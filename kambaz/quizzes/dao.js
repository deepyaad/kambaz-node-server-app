import model from "./model.js";
import questionModel from "../questions/model.js";
import { v4 as uuidv4 } from 'uuid';

export function findAllQuizzes() {
  return model.find();
}

export async function findQuizById(quizId) {
  const quiz = await model.findById(quizId);
  if (!quiz) return null;
  const quizQuestions = await questionModel.find({ quizId });
  return { ...quiz.toObject(), questions: quizQuestions };
}

export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  return model.create(newQuiz);
}

export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

export async function updateQuiz(quizId, quizUpdates) {
  const result = await model.updateOne({ _id: quizId }, { $set: quizUpdates });
  if (result.matchedCount === 0) return null;
  return model.findById(quizId);
}
