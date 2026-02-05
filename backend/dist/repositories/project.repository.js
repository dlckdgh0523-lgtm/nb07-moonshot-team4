import prisma from "../utils/prisma.js";
export function createProject(data) {
    return prisma.project.create({ data });
}
export function getProjectById(projectId) {
    return prisma.project.findUnique({
        where: { id: projectId },
    });
}
export async function isProjectMember(userId, projectId) {
    const project = await getProjectById(projectId);
    if (!project) {
        return false;
    }
    const member = await prisma.projectMember.findFirst({
        where: {
            userId: userId,
            projectId: projectId,
        },
    });
    if (member) {
        return true;
    }
    const task = await prisma.task.findFirst({
        where: {
            projectId: projectId,
            assigneeId: userId,
        },
    });
    return !!task;
}
//# sourceMappingURL=project.repository.js.map