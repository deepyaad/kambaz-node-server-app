import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    
    app.put("/api/assignments/:assId", async (req, res) => {
        const { assId } = req.params;
        const assignmentUpdates = req.body;
        const status = await assignmentsDao.updateAssignment(assId, assignmentUpdates);
        res.send(status);
    });

    app.delete("/api/assignments/:assId", async (req, res) => {
        const { assId } = req.params;
        const status = await assignmentsDao.deleteAssignment(assId);
        res.send(status);
    });
}
