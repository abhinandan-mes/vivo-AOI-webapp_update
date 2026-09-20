const { PrismaClient } = require('./server/generated/client2');
const prisma = new PrismaClient();
async function run() {
  const count = await prisma.laserChangeoverChecksheet.count();
  console.log('Total:', count);
  
  const systemRows = await prisma.laserChangeoverChecksheet.count({
    where: { submitted_by: 'System (Automatic)' }
  });
  console.log('System rows:', systemRows);
}
run().catch(console.error).finally(() => prisma.$disconnect());
