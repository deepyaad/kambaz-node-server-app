import model from "./model.js";

export function findGradeByStudentAndQuiz(studentId, quizId) {
  return model.findOne({ student: studentId, quizId: quizId });
}