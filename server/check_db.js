const { PrismaClient } = require('./prisma/generated/client2');
const prisma = new PrismaClient();
async function run() {
  const count = await prisma.laserChangeoverChecksheet.count();
  console.log('Total:', count);
  
  const systemRows = await prisma.laserChangeoverChecksheet.count({
    where: { submitted_by: 'System (Automatic)' }
  });
  console.log('System rows:', systemRows);
  
  if (systemRows > 0) {
    console.log("Deleting system rows...");
    await prisma.laserChangeoverChecksheet.deleteMany({
      where: { submitted_by: 'System (Automatic)' }
    });
    console.log("Deleted.");
  }
}
run().catch(console.error).finally(() => prisma.$disconnect());
