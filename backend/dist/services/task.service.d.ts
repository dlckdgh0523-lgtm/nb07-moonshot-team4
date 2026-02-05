import { CreateSubTaskDto, CreateTaskDto, GetTasksResponseDto, SubTaskDto, TaskDto, UpdateSubTaskDto, UpdateTaskDto } from '../dtos/task.dto.js';
export declare const createTask: (userId: number, projectId: number, data: CreateTaskDto) => Promise<TaskDto>;
export declare const getTasksByProjectId: (userId: number, projectId: number, page?: number, limit?: number, queryFilters?: {
    status?: "todo" | "in_progress" | "done";
    assigneeId?: number;
    keyword?: string;
    order?: "asc" | "desc";
    orderBy?: "created_at" | "name" | "end_date";
}) => Promise<GetTasksResponseDto>;
export declare const getTask: (userId: number, taskId: number) => Promise<TaskDto>;
export declare const updateTask: (taskId: number, userId: number, data: UpdateTaskDto) => Promise<TaskDto>;
export declare const deleteTask: (taskId: number, userId: number) => Promise<{
    message: string;
}>;
export declare const createSubTask: (userId: number, taskId: number, data: CreateSubTaskDto) => Promise<SubTaskDto>;
export declare const updateSubTask: (userId: number, subTaskId: number, data: UpdateSubTaskDto) => Promise<SubTaskDto>;
export declare const deleteSubTask: (userId: number, subTaskId: number) => Promise<{
    message: string;
}>;
