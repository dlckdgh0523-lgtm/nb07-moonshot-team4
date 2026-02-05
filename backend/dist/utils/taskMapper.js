function toApiTaskStatus(status) {
    const v = String(status).toUpperCase();
    if (v === "TODO")
        return "todo";
    if (v === "IN_PROGRESS")
        return "in_progress";
    if (v === "DONE")
        return "done";
    return "todo";
}
function toApiSubTaskStatus(status) {
    const v = String(status).toUpperCase();
    if (v === "DONE")
        return "done";
    return "todo";
}
const CrudTaskApi = (task) => {
    return {
        id: task.id,
        projectId: task.projectId,
        title: task.title,
        startYear: task.startDate.getFullYear(),
        startMonth: task.startDate.getMonth() + 1,
        startDay: task.startDate.getDate(),
        endYear: task.endDate.getFullYear(),
        endMonth: task.endDate.getMonth() + 1,
        endDay: task.endDate.getDate(),
        status: toApiTaskStatus(task.status),
        assignee: task.assignee ? {
            id: task.assignee.id,
            name: task.assignee.name,
            email: task.assignee.email,
            profileImage: task.assignee.profileImage ?? "",
        } : null,
        tags: task.tags.map((taskTag) => ({
            id: taskTag.tag.id,
            name: taskTag.tag.name
        })),
        attachments: task.attachments.map((a) => a.url),
        subTasks: task.subTasks?.map((st) => ({
            id: st.id,
            title: st.title,
            status: toApiSubTaskStatus(st.status),
        })),
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
    };
};
export default CrudTaskApi;
//# sourceMappingURL=taskMapper.js.map