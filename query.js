const { PrismaClient } = require('./server/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const checkpoints = await prisma.aoiFunctionCheckpoint.findMany({ 
    where: { date: new Date('2026-07-15') } 
  });
  console.log("Checkpoints:");
  console.table(checkpoints.map(x => ({ id: x.id, line: x.line, shift: x.shift, status: x.status })));
  
  const checklists = await prisma.aoiTechnicianChecklist.findMany({ 
    where: { date: new Date('2026-07-15') } 
  });
  console.log("Checklists:");
  console.table(checklists.map(x => ({ id: x.id, line: x.line, shift: x.shift, status: x.status })));
}

main().finally(() => prisma.$disconnect());
