const { PrismaClient } = require('./prisma/generated/client2');
const prisma = new PrismaClient();
async function run() {
  const all = await prisma.laserChangeoverChecksheet.findMany({ select: { id: true, submitted_by: true, date: true, program_name: true } });
  console.log(all.slice(0, 5));
}
run().catch(console.error).finally(() => prisma.$disconnect());
