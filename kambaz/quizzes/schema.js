import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    available: Date,
    until: Date,
    due: Date,
    description: String,
    points: Number,
    numQuestions: Number,
    published: Boolean,
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      required: true,
    },
    assignmentGroup: String,
    shuffleAnswers: Boolean,
    timeLimit: { type: Number, default: null },
    multipleAttempts: Boolean,
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: {
      type: String,
      enum: [
        "Never", "Always", "After Due Date", "Immediately", "After Last Attempt", "After Grade Posted",
      ],
      default: "Never",
    },
    accessCode: String,
    oneQuestionAtATime: Boolean,
    webcamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
  },
  { collection: "quizzes" }
);
export default quizSchema;