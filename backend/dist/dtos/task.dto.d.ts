export interface TaskDto {
    id: number;
    projectId: number;
    title: string;
    startYear: number;
    startMonth: number;
    startDay: number;
    endYear: number;
    endMonth: number;
    endDay: number;
    status: 'todo' | 'in_progress' | 'done';
    assignee: {
        id: number;
        name: string;
        email: string;
        profileImage: string;
    } | null;
    tags: {
        id: number;
        name: string;
    }[];
    attachments: string[];
    subTasks?: {
        id: number;
        title: string;
        status: 'todo' | 'done';
    }[];
    createdAt: Date;
    updatedAt: Date;
}
export interface SubTaskDto {
    id: number;
    taskId: number;
    title: string;
    status: 'todo' | 'done';
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateSubTaskDto {
    title: string;
}
export interface UpdateSubTaskDto {
    title?: string;
    done?: boolean;
}
export interface GetTasksResponseDto {
    data: TaskDto[];
    total: number;
}
export interface CreateTaskDto {
    title: string;
    startYear: number;
    startMonth: number;
    startDay: number;
    endYear: number;
    endMonth: number;
    endDay: number;
    status?: 'todo' | 'in_progress' | 'done';
    tags: string[];
    attachments: string[];
    subTasks?: string[];
}
export interface UpdateTaskDto {
    title?: string;
    startYear?: number;
    startMonth?: number;
    startDay?: number;
    endYear?: number;
    endMonth?: number;
    endDay?: number;
    status?: 'todo' | 'in_progress' | 'done';
    tags?: string[];
    attachments?: string[];
    subTasks?: string[];
    assigneeId?: number | null;
}
