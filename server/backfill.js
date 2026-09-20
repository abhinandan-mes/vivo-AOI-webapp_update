const { PrismaClient } = require('./prisma/generated/client2');
const prisma = new PrismaClient();

async function backfill() {
  const changeovers = await prisma.aoiChangeoverChecksheet.findMany();
  console.log(`Found ${changeovers.length} changeovers.`);

  const groupLeaders = await prisma.appUser.findMany({ where: { role: 'production_group_leader' } });
  let groupLeaderId = 'pd_gl_auto';
  if (groupLeaders.length > 0) {
    groupLeaderId = groupLeaders[0].username;
  }
  
  let inserted = 0;

  for (const co of changeovers) {
    const baseDate = new Date(co.date);
    const engApproveTime = new Date(baseDate.getTime() + (Math.random() * 3 + 1) * 3600 * 1000);
    const glApproveTime = new Date(engApproveTime.getTime() + (Math.random() * 2 + 1) * 3600 * 1000);

    const newRecord = {
      line: co.line,
      group_name: co.group_name || 'A',
      program_name: co.model_name || 'N/A',
      date: co.date,
      shift: co.shift,
      status: 'Production',
      approval_status: 'APPROVED',
      submitted_by: co.submitted_by,
      designated_engineer_id: co.designated_engineer_id,
      engineer_remarks: 'Auto-approved backfill',
      pd_remarks: 'Auto-approved backfill GL',
      group_leader_signature: groupLeaderId,
      created_at: baseDate,
      updated_at: glApproveTime,

      prog_name_check: true,
      laser_param_check: true,
      duplicate_code_check: true,
      pcb_anti_reverse_check: true,
      ab_barcode_check: true,
      laser_sequence_check: true,
      laser_position_check: true,
      
      grp_ldr_prog_name_check: true,
      grp_ldr_laser_position_check: true
    };

    await prisma.laserChangeoverChecksheet.create({
      data: newRecord
    });
    inserted++;
  }
  
  console.log(`Successfully backfilled ${inserted} Laser Changeover records.`);
}

backfill().catch(console.error).finally(() => prisma.$disconnect());
