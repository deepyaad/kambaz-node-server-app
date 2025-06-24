import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
}, { _id: false });

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, ref: "QuizModel" },
    type: {
      type: String,
      enum: ["multiple_choice", "true_false", "fill_blank"],
      required: true,
    },
    title: String,
    points: Number,
    question: String,
    choices: {
      type: [choiceSchema],
      required: function() {
        return this.type === "multiple_choice";
      },
    },

    answer: {
      type: Boolean,
      required: function() {
        return this.type === "true_false";
      },
    },

    answers: {
      type: [String],
      required: function() {
        return this.type === "fill_blank";
      },
    },
    caseInsensitive: {
      type: Boolean,
      default: false,
      required: function() {
        return this.type === "fill_blank";
      },
    },
    mode: {
      type: String,
      enum: ["view", "edit"],
      default: "view",
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "questions" }
);

export default questionSchema;
