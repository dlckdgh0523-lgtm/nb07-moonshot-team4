import { SubTaskStatus, TaskStatus } from "@prisma/client";
import prisma from "../utils/prisma.js";
function toPrismaTaskStatus(status) {
    switch (status) {
        case "todo":
            return TaskStatus.TODO;
        case "in_progress":
            return TaskStatus.IN_PROGRESS;
        case "done":
            return TaskStatus.DONE;
    }
}
export function createTask(data) {
    return prisma.task.create({
        data: {
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            status: toPrismaTaskStatus(data.status),
            projectId: data.projectId,
            assigneeId: data.assigneeId,
            attachments: {
                create: data.attachments.map((url) => ({
                    url,
                    name: url.split("/").pop() || url,
                })),
            },
            subTasks: data.subTasks
                ? {
                    create: data.subTasks.map((title) => ({
                        title,
                        status: SubTaskStatus.TODO,
                    })),
                }
                : undefined,
            tags: {
                create: data.tags.map((tagName) => ({
                    tag: {
                        connectOrCreate: {
                            where: { projectId_name: { projectId: data.projectId, name: tagName } },
                            create: { projectId: data.projectId, name: tagName },
                        },
                    },
                })),
            },
        },
        include: {
            assignee: true,
            tags: { include: { tag: true } },
            attachments: true,
            subTasks: true,
        },
    });
}
export function getTasksByProjectId(projectId, { status, assigneeId, keyword, order, orderBy, skip = 0, take = 10 }) {
    const where = { projectId };
    if (status)
        where.status = toPrismaTaskStatus(status);
    if (assigneeId)
        where.assigneeId = assigneeId;
    if (keyword)
        where.title = { contains: keyword };
    return prisma.task.findMany({
        where,
        orderBy: orderBy ? { [orderBy]: order || 'asc' } : { createdAt: 'desc' },
        include: {
            assignee: true,
            tags: { include: { tag: true } },
            attachments: true,
            subTasks: true,
        },
        skip: skip,
        take: take,
    });
}
export function countTasksByProjectId(projectId, { status, assigneeId, keyword, }) {
    const where = { projectId };
    if (status)
        where.status = toPrismaTaskStatus(status);
    if (assigneeId)
        where.assigneeId = assigneeId;
    if (keyword)
        where.title = { contains: keyword };
    return prisma.task.count({
        where,
    });
}
export function getTaskById(taskId) {
    return prisma.task.findUnique({
        where: { id: taskId },
        include: {
            assignee: true,
            tags: { include: { tag: true } },
            attachments: true,
            subTasks: true,
        },
    });
}
export async function updateTask(taskId, data) {
    const updateData = {
        ...(data.title && { title: data.title }),
        ...(data.startDate && { startDate: data.startDate }),
        ...(data.endDate && { endDate: data.endDate }),
        ...(data.status && { status: toPrismaTaskStatus(data.status) }),
        ...(data.assigneeId !== undefined && { assigneeId: data.assigneeId }),
    };
    if (data.attachments) {
        updateData.attachments = {
            deleteMany: {},
            create: data.attachments.map((url) => ({
                url,
                name: url.split("/").pop() || url,
            })),
        };
    }
    if (data.subTasks) {
        updateData.subTasks = {
            deleteMany: {},
            create: data.subTasks.map((title) => ({
                title,
                status: SubTaskStatus.TODO,
            })),
        };
    }
    if (data.tags) {
        const existing = await prisma.task.findUnique({
            where: { id: taskId },
            select: { projectId: true },
        });
        if (!existing) {
            throw new Error("Task not found");
        }
        updateData.tags = {
            deleteMany: {},
            create: data.tags.map((tagName) => ({
                tag: {
                    connectOrCreate: {
                        where: { projectId_name: { projectId: existing.projectId, name: tagName } },
                        create: { projectId: existing.projectId, name: tagName },
                    },
                },
            })),
        };
    }
    return prisma.task.update({
        where: { id: taskId },
        data: updateData,
        include: {
            assignee: true,
            tags: { include: { tag: true } },
            attachments: true,
            subTasks: true,
        },
    });
}
export function deleteTask(taskId) {
    return prisma.task.delete({
        where: { id: taskId },
        include: {
            assignee: true,
            tags: { include: { tag: true } },
            attachments: true,
            subTasks: true,
        },
    });
}
export function createSubTask(taskId, title) {
    return prisma.subTask.create({
        data: {
            taskId,
            title,
            status: SubTaskStatus.TODO,
        },
        include: { task: true },
    });
}
export function getSubTaskById(subTaskId) {
    return prisma.subTask.findUnique({
        where: { id: subTaskId },
        include: { task: true },
    });
}
export function updateSubTask(subTaskId, data) {
    return prisma.subTask.update({
        where: { id: subTaskId },
        data,
        include: { task: true },
    });
}
export function deleteSubTask(subTaskId) {
    return prisma.subTask.delete({
        where: { id: subTaskId },
        include: { task: true },
    });
}
//# sourceMappingURL=task.repository.js.map