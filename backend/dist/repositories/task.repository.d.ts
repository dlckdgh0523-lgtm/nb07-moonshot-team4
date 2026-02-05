import { Prisma, SubTaskStatus } from "@prisma/client";
type TaskWithAssigneeAndTags = Prisma.TaskGetPayload<{
    include: {
        assignee: true;
        tags: {
            include: {
                tag: true;
            };
        };
        attachments: true;
        subTasks: true;
    };
}>;
export declare function createTask(data: {
    title: string;
    startDate?: Date | null;
    endDate?: Date | null;
    status: "todo" | "in_progress" | "done";
    attachments: string[];
    projectId: number;
    assigneeId?: number | null;
    tags: string[];
    subTasks?: string[];
}): Promise<TaskWithAssigneeAndTags>;
export declare function getTasksByProjectId(projectId: number, { status, assigneeId, keyword, order, orderBy, skip, take }: {
    status?: "todo" | "in_progress" | "done";
    assigneeId?: number;
    keyword?: string;
    order?: 'asc' | 'desc';
    orderBy?: 'createdAt' | 'title' | 'endDate';
    skip?: number;
    take?: number;
}): Promise<TaskWithAssigneeAndTags[]>;
export declare function countTasksByProjectId(projectId: number, { status, assigneeId, keyword, }: {
    status?: "todo" | "in_progress" | "done";
    assigneeId?: number;
    keyword?: string;
}): Promise<number>;
export declare function getTaskById(taskId: number): Promise<TaskWithAssigneeAndTags | null>;
export declare function updateTask(taskId: number, data: {
    title?: string;
    startDate?: Date;
    endDate?: Date;
    status?: "todo" | "in_progress" | "done";
    attachments?: string[];
    assigneeId?: number | null;
    tags?: string[];
    subTasks?: string[];
}): Promise<TaskWithAssigneeAndTags>;
export declare function deleteTask(taskId: number): Promise<TaskWithAssigneeAndTags>;
type SubTaskWithTask = Prisma.SubTaskGetPayload<{
    include: {
        task: true;
    };
}>;
export declare function createSubTask(taskId: number, title: string): Promise<SubTaskWithTask>;
export declare function getSubTaskById(subTaskId: number): Promise<SubTaskWithTask | null>;
export declare function updateSubTask(subTaskId: number, data: {
    title?: string;
    status?: SubTaskStatus;
}): Promise<SubTaskWithTask>;
export declare function deleteSubTask(subTaskId: number): Promise<SubTaskWithTask>;
export {};
