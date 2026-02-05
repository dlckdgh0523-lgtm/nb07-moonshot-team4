import { Project } from "@prisma/client";
export declare function createProject(data: Project): import(".prisma/client").Prisma.Prisma__ProjectClient<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    color: string | null;
    description: string | null;
    todoCount: number;
    inProgressCount: number;
    doneCount: number;
    memberCount: number;
    ownerId: number;
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare function getProjectById(projectId: number): Promise<Project | null>;
export declare function isProjectMember(userId: number, projectId: number): Promise<boolean>;
