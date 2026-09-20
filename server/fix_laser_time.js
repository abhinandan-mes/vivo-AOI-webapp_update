const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const laserRows = await prisma.laserChangeoverChecksheet.findMany();
  let updatedCount = 0;
  
  for (const laser of laserRows) {
    const changeover = await prisma.aoiChangeoverChecksheet.findFirst({
      where: {
        line: laser.line,
        shift: laser.shift,
        date: laser.date
      }
    });
    
    if (changeover) {
      await prisma.laserChangeoverChecksheet.update({
        where: { id: laser.id },
        data: { created_at: changeover.created_at }
      });
      updatedCount++;
    }
  }
  
  console.log('Updated ' + updatedCount + ' records');
}

run().catch(console.error).finally(() => prisma.());
