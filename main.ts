import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();
  const serverId = "testid";
  const sinnerId = "testsinnerid";
  const sinnerUsername = "sinneruser";
  const absolvedAt = new Date();
  const data = await prisma.serverToSinner.upsert({
    where: {
      serverId_sinnerId: {
        serverId,
        sinnerId,
      },
    },
    create: {
      Server: {
        connect: {
          id: serverId,
        },
      },
      Sinner: {
        connectOrCreate: {
          where: {
            id: sinnerId,
          },
          create: {
            id: sinnerId,
            username: sinnerUsername,
          },
        },
      },
      absolvedAt,
    },
    update: {
      absolvedAt,
    },
  });
  console.log(data);
  await prisma.$disconnect();
}

main();
