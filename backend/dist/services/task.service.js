import CrudTaskApi from '../utils/taskMapper.js';
import * as taskRepo from '../repositories/task.repository.js';
import * as projectRepo from '../repositories/project.repository.js';
import { SubTaskStatus } from '@prisma/client';
function mapSubTaskStatusToDto(status) {
    const v = String(status).toUpperCase();
    if (v === "DONE")
        return "done";
    return "todo";
}
function toSubTaskDto(subTask) {
    return {
        id: subTask.id,
        taskId: subTask.taskId,
        title: subTask.title,
        status: mapSubTaskStatusToDto(subTask.status),
        createdAt: subTask.createdAt,
        updatedAt: subTask.updatedAt,
    };
}
export const createTask = async (userId, projectId, data) => {
    const targetProject = await projectRepo.getProjectById(projectId);
    if (!targetProject) {
        throw { status: 404, message: "프로젝트를 찾을 수 없습니다" };
    }
    const isProjectMember = await projectRepo.isProjectMember(userId, projectId);
    if (!isProjectMember) {
        throw { status: 403, message: "프로젝트 멤버가 아닙니다" };
    }
    if (!data.title || data.title.trim() === '') {
        throw { status: 400, message: "제목은 필수입니다" };
    }
    const startDate = new Date(data.startYear, data.startMonth - 1, data.startDay);
    const endDate = new Date(data.endYear, data.endMonth - 1, data.endDay);
    if (endDate < startDate) {
        throw { status: 400, message: "종료일이 시작일보다 빠를 수 없습니다" };
    }
    const taskStatus = data.status || 'todo';
    const createdTask = await taskRepo.createTask({
        title: data.title,
        projectId: projectId,
        assigneeId: userId,
        status: taskStatus,
        attachments: data.attachments,
        tags: data.tags,
        subTasks: data.subTasks,
        startDate: startDate,
        endDate: endDate,
    });
    return CrudTaskApi(createdTask);
};
export const getTasksByProjectId = async (userId, projectId, page = 1, limit = 10, queryFilters) => {
    const targetProject = await projectRepo.getProjectById(projectId);
    if (!targetProject) {
        throw { status: 404, message: "프로젝트를 찾을 수 없습니다" };
    }
    const isProjectMember = await projectRepo.isProjectMember(userId, projectId);
    if (!isProjectMember) {
        throw { status: 403, message: "프로젝트 멤버가 아닙니다" };
    }
    const skip = (page - 1) * limit;
    const take = limit;
    let prismaOrderByField;
    if (queryFilters?.orderBy) {
        if (queryFilters.orderBy === 'created_at')
            prismaOrderByField = 'createdAt';
        else if (queryFilters.orderBy === 'name')
            prismaOrderByField = 'title';
        else if (queryFilters.orderBy === 'end_date')
            prismaOrderByField = 'endDate';
    }
    const tasks = await taskRepo.getTasksByProjectId(projectId, {
        status: queryFilters?.status,
        assigneeId: queryFilters?.assigneeId,
        keyword: queryFilters?.keyword,
        order: queryFilters?.order,
        orderBy: prismaOrderByField,
        skip: skip,
        take: take,
    });
    const total = await taskRepo.countTasksByProjectId(projectId, {
        status: queryFilters?.status,
        assigneeId: queryFilters?.assigneeId,
        keyword: queryFilters?.keyword,
    });
    return {
        data: tasks.map((task) => CrudTaskApi(task)),
        total,
    };
};
export const getTask = async (userId, taskId) => {
    const task = await taskRepo.getTaskById(taskId);
    if (!task) {
        throw { status: 404, message: "태스크를 찾을 수 없습니다" };
    }
    const isMember = await projectRepo.isProjectMember(userId, task.projectId);
    if (!isMember) {
        throw { status: 403, message: "프로젝트 멤버가 아닙니다" };
    }
    return CrudTaskApi(task);
};
export const updateTask = async (taskId, userId, data) => {
    const existingTask = await taskRepo.getTaskById(taskId);
    if (!existingTask) {
        throw { status: 404, message: "태스크를 찾을 수 없습니다" };
    }
    const isProjectMember = await projectRepo.isProjectMember(userId, existingTask.projectId);
    if (!isProjectMember) {
        throw { status: 403, message: "프로젝트 멤버가 아닙니다" };
    }
    const updateData = {};
    if (data.title !== undefined) {
        if (data.title.trim() === '') {
            throw { status: 400, message: "제목은 필수입니다" };
        }
        updateData.title = data.title;
    }
    if (data.status)
        updateData.status = data.status;
    if (data.attachments)
        updateData.attachments = data.attachments;
    if (data.assigneeId !== undefined)
        updateData.assigneeId = data.assigneeId;
    if (data.tags)
        updateData.tags = data.tags;
    if (data.subTasks)
        updateData.subTasks = data.subTasks;
    if (data.startYear !== undefined && data.startMonth !== undefined && data.startDay !== undefined) {
        updateData.startDate = new Date(data.startYear, data.startMonth - 1, data.startDay);
    }
    if (data.endYear !== undefined && data.endMonth !== undefined && data.endDay !== undefined) {
        updateData.endDate = new Date(data.endYear, data.endMonth - 1, data.endDay);
    }
    const startDate = updateData.startDate || existingTask.startDate;
    const endDate = updateData.endDate || existingTask.endDate;
    if (endDate < startDate) {
        throw { status: 400, message: "종료일이 시작일보다 빠를 수 없습니다" };
    }
    const updatedTask = await taskRepo.updateTask(taskId, updateData);
    return CrudTaskApi(updatedTask);
};
export const deleteTask = async (taskId, userId) => {
    const existingTask = await taskRepo.getTaskById(taskId);
    if (!existingTask) {
        throw { status: 404, message: "태스크를 찾을 수 없습니다" };
    }
    const isProjectMember = await projectRepo.isProjectMember(userId, existingTask.projectId);
    if (!isProjectMember) {
        throw { status: 403, message: "프로젝트 멤버가 아닙니다" };
    }
    await taskRepo.deleteTask(taskId);
    return { message: "성공적으로 삭제되었습니다" };
};
// ----- SubTask (하위 할 일) Service -----
export const createSubTask = async (userId, taskId, data) => {
    const parentTask = await taskRepo.getTaskById(taskId);
    if (!parentTask) {
        throw { status: 404, message: "태스크를 찾을 수 없습니다" };
    }
    const isProjectMember = await projectRepo.isProjectMember(userId, parentTask.projectId);
    if (!isProjectMember) {
        throw { status: 403, message: "프로젝트 멤버가 아닙니다" };
    }
    if (!data.title || data.title.trim() === "") {
        throw { status: 400, message: "제목은 필수입니다" };
    }
    const created = await taskRepo.createSubTask(taskId, data.title);
    return toSubTaskDto(created);
};
export const updateSubTask = async (userId, subTaskId, data) => {
    const existing = await taskRepo.getSubTaskById(subTaskId);
    if (!existing) {
        throw { status: 404, message: "하위 할 일을 찾을 수 없습니다" };
    }
    const isProjectMember = await projectRepo.isProjectMember(userId, existing.task.projectId);
    if (!isProjectMember) {
        throw { status: 403, message: "프로젝트 멤버가 아닙니다" };
    }
    const patch = {};
    if (data.title !== undefined) {
        if (data.title.trim() === "") {
            throw { status: 400, message: "제목은 필수입니다" };
        }
        patch.title = data.title;
    }
    if (data.done !== undefined) {
        patch.status = data.done ? SubTaskStatus.DONE : SubTaskStatus.TODO;
    }
    const updated = await taskRepo.updateSubTask(subTaskId, patch);
    return toSubTaskDto(updated);
};
export const deleteSubTask = async (userId, subTaskId) => {
    const existing = await taskRepo.getSubTaskById(subTaskId);
    if (!existing) {
        throw { status: 404, message: "하위 할 일을 찾을 수 없습니다" };
    }
    const isProjectMember = await projectRepo.isProjectMember(userId, existing.task.projectId);
    if (!isProjectMember) {
        throw { status: 403, message: "프로젝트 멤버가 아닙니다" };
    }
    await taskRepo.deleteSubTask(subTaskId);
    return { message: "성공적으로 삭제되었습니다" };
};
//# sourceMappingURL=task.service.js.map