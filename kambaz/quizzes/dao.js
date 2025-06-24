import Database from "../database/index.js";
import { v4 as uuidv4 } from 'uuid';

export function findAllQuizzes() {
  const { quizzes } = Database;
  return quizzes;
}

export function findQuizById(quizId) {
  const { quizzes, questions } = Database;
  const quiz = quizzes.find((q) => q._id === quizId);
  if (!quiz) return null;
  const quizQuestions = questions.filter((q) => q.quizId === quizId);
  return { ...quiz, questions: quizQuestions };
}

export function deleteQuiz(quizId) {
 const { quizzes } = Database;
 Database.quizzes = quizzes.filter((quiz) => quiz._id !== quizId);
}

export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  Database.quizzes = [...Database.quizzes, newQuiz];
  return newQuiz;
}

export function findQuizzesForCourse(courseId) {
  const { quizzes } = Database;
  return quizzes.filter((quiz) => quiz.course === courseId);
}

export function updateQuiz(quizId, quizUpdates) {
  const { quizzes } = Database;
  const quiz = quizzes.find((q) => q._id === quizId); 
  if (quiz) { 
    Object.assign(quiz, quizUpdates);
    return quiz;
  }
  return null; 
}