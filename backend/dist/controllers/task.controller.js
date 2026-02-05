import * as taskService from '../services/task.service.js';
export const createTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다" });
        }
        const userId = req.user.id;
        const projectId = Number(req.params.projectId);
        const createTaskDto = req.body;
        const result = await taskService.createTask(userId, projectId, createTaskDto);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
    }
};
export async function getTasksByProjectId(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다" });
        }
        const userId = req.user.id;
        const projectId = Number(req.params.projectId);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const taskStatus = req.query.status;
        const assigneeId = req.query.assignee ? Number(req.query.assignee) : undefined;
        const keyword = req.query.keyword;
        const sortOrder = req.query.order;
        const sortField = req.query.order_by;
        const result = await taskService.getTasksByProjectId(userId, projectId, page, limit, {
            status: taskStatus,
            assigneeId,
            keyword,
            order: sortOrder,
            orderBy: sortField,
        });
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
    }
}
export async function getTask(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다" });
        }
        const userId = req.user.id;
        const taskId = Number(req.params.taskId);
        const result = await taskService.getTask(userId, taskId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
    }
}
export async function updateTask(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다" });
        }
        const userId = req.user.id;
        const taskId = Number(req.params.taskId);
        const updateTaskDto = req.body;
        const result = await taskService.updateTask(taskId, userId, updateTaskDto);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
    }
}
export async function deleteTask(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다" });
        }
        const userId = req.user.id;
        const taskId = Number(req.params.taskId);
        const result = await taskService.deleteTask(taskId, userId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
    }
}
// ----- SubTask controllers -----
export async function createSubTask(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다" });
        }
        const userId = req.user.id;
        const taskId = Number(req.params.taskId);
        const createSubTaskDto = req.body;
        const result = await taskService.createSubTask(userId, taskId, createSubTaskDto);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
    }
}
export async function updateSubTask(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다" });
        }
        const userId = req.user.id;
        const subTaskId = Number(req.params.subTaskId);
        const updateSubTaskDto = req.body;
        const result = await taskService.updateSubTask(userId, subTaskId, updateSubTaskDto);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
    }
}
export async function deleteSubTask(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다" });
        }
        const userId = req.user.id;
        const subTaskId = Number(req.params.subTaskId);
        const result = await taskService.deleteSubTask(userId, subTaskId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
    }
}
//# sourceMappingURL=task.controller.js.map