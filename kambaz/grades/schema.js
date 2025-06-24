import mongoose from "mongoose";
const gradeSchema = new mongoose.Schema(
  {
    _id: String,
    student: { type: String, ref: "UserModel" },
    quizId: { type: String, ref: "QuizModel" },
    grade: { type: Number, default: null },
  },
  { collection: "grades" }
);
export default gradeSchema;
