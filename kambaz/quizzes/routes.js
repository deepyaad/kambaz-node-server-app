import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {

    app.put("/api/quizzes/:quizId", async (req, res) => { 
        const { quizId } = req.params; 
        const quizUpdates = req.body; 
        try {
            const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
            res.json(status); 
        } catch (error) {
            console.error("Error updating quiz:", error);
            res.status(500).json({ message: "Failed to update quiz", error: error.message });
        }
    });

    app.delete("/api/quizzes/:quizId", async (req, res) => { 
        const { quizId } = req.params;
        try {
            const status = await quizzesDao.deleteQuiz(quizId); 
            res.json(status); 
        } catch (error) {
            console.error("Error deleting quiz:", error);
            res.status(500).json({ message: "Failed to delete quiz", error: error.message });
        }
    });

    app.get("/api/quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        try {
            const quiz = quizzesDao.findQuizById(quizId);
            if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
            }
            res.json(quiz);
        } catch (err) {
            console.error("Failed to get quiz:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    });


}