import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {

    app.put("/api/quizzes/:quizId", async (req, res) => { // Made async
        const { quizId } = req.params; // Extract quizId from params
        const quizUpdates = req.body; // Updates are in the body
        try {
            const status = await quizzesDao.updateQuiz(quizId, quizUpdates); // Pass quizId and updates
            res.json(status); // Use res.json for consistent JSON response
        } catch (error) {
            console.error("Error updating quiz:", error);
            res.status(500).json({ message: "Failed to update quiz", error: error.message });
        }
    });

    app.delete("/api/quizzes/:quizId", async (req, res) => { // Made async
        const { quizId } = req.params;
        try {
            const status = await quizzesDao.deleteQuiz(quizId); // Awaited
            res.json(status); // Use res.json
        } catch (error) {
            console.error("Error deleting quiz:", error);
            res.status(500).json({ message: "Failed to delete quiz", error: error.message });
        }
    });

    // You might also have POST and GET routes here for quizzes, depending on your overall routing structure.
    // Ensure they are also `async` and use `try/catch`.
    // Example (if not in courses/routes.js):
    // app.post("/api/courses/:cid/quizzes", async (req, res) => {
    //     const { cid } = req.params;
    //     try {
    //         const newQuiz = await quizzesDao.createQuiz({ ...req.body, course: cid });
    //         res.status(201).json(newQuiz);
    //     } catch (error) {
    //         console.error("Error creating quiz:", error);
    //         res.status(500).json({ message: "Failed to create quiz", error: error.message });
    //     }
    // });
    // app.get("/api/courses/:cid/quizzes", async (req, res) => {
    //     const { cid } = req.params;
    //     try {
    //         const quizzes = await quizzesDao.findQuizzesForCourse(cid);
    //         res.json(quizzes);
    //     } catch (error) {
    //         console.error("Error fetching quizzes for course:", error);
    //         res.status(500).json({ message: "Failed to fetch quizzes", error: error.message });
    //     }
    // });
}


/*
import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {

    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    });

    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await quizzesDao.deleteQuiz(quizId);
        res.send(status);
    });
}
    */