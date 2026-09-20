const { PrismaClient } = require('./prisma/generated/client2');
const prisma = new PrismaClient();
async function run() {
  const deleted = await prisma.laserChangeoverChecksheet.deleteMany({
    where: {
      date: {
        lt: new Date('2026-09-01')
      }
    }
  });
  console.log("Deleted old rows:", deleted.count);
}
run().catch(console.error).finally(() => prisma.$disconnect());
