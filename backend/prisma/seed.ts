import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. User + AuthProvider
  const user = await prisma.user.create({
    data: {
      email: 'testuser@example.com',
      name: '테스트유저',
      authProviders: {
        create: {
          provider: 'local',
          providerUserId: 'testuser@example.com',
          passwordHash: 'hashed-password',
        },
      },
    },
  });

  // 2. Project
  const project = await prisma.project.create({
    data: {
      name: 'Moonshot 프로젝트',
      description: 'Seed 테스트용 프로젝트',
    },
  });

  // 3. ProjectMember
  await prisma.projectMember.create({
    data: {
      userId: user.id,
      projectId: project.id,
      status: 'accepted',
      invitationId: 'seed-invite',
    },
  });

  // 4. Tags
  const backendTag = await prisma.tag.create({
    data: { name: 'backend' },
  });

  // 5. Task + assignee
  const task = await prisma.task.create({
    data: {
      title: 'Seed 데이터 연결하기',
      status: 'todo',
      projectId: project.id,
      assigneeId: user.id,
      startYear: 2025,
      startMonth: 4,
      startDay: 1,
      endYear: 2025,
      endMonth: 4,
      endDay: 10,
    },
  });

  // 6. TaskTag (M:N)
  await prisma.taskTag.create({
    data: {
      taskId: task.id,
      tagId: backendTag.id,
    },
  });

  console.log('🌱 Seed 완료');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });