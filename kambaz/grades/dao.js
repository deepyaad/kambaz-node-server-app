import Database from "../database/index.js"; 

export function findGradesForUserAndCourse(userId, courseId) {
  const { grades } = Database; 

  return grades.filter(
    (grade) => grade.student === userId 
  );
}

export function findGradeByStudentAndQuiz(studentId, quizId) {
  const { grades } = Database;
  return grades.find(
    (grade) => grade.student === studentId && grade.quizId === quizId
  );
}