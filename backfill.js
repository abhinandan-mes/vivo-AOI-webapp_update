const { PrismaClient } = require('./server/prisma/generated/client2');
const prisma = new PrismaClient();

async function backfill() {
  const oldChangeovers = await prisma.aoiChangeoverChecksheet.findMany({
    where: {
      status: 'Production'
    }
  });

  console.log(`Found ${oldChangeovers.length} Changeover records`);

  for (const record of oldChangeovers) {
    const existing = await prisma.laserChangeoverChecksheet.findFirst({
      where: {
        line: record.line,
        group_name: record.group_name,
        date: record.date,
        shift: record.shift,
        program_name: record.model_name || 'Legacy Model'
      }
    });

    if (!existing) {
      await prisma.laserChangeoverChecksheet.create({
        data: {
          line: record.line,
          group_name: record.group_name,
          program_name: record.model_name || 'Legacy Model',
          date: record.date,
          shift: record.shift,
          prog_name_check: true,
          laser_param_check: true,
          duplicate_code_check: true,
          pcb_anti_reverse_check: true,
          ab_barcode_check: true,
          laser_sequence_check: true,
          laser_position_check: true,
          status: 'Production',
          approval_status: 'GRP_LDR_PENDING',
          designated_engineer_id: record.designated_engineer_id,
          submitted_by: record.submitted_by,
          engineer_signature: record.designated_engineer_id
        }
      });
      console.log(`Created Laser record for Line ${record.line}, Date ${record.date}`);
    } else {
      console.log(`Skipped existing Laser record for Line ${record.line}`);
    }
  }
}

backfill().then(() => {
  console.log('Done');
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
