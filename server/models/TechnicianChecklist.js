const prisma = require('../config/db');

const technicianChecklistModel = {
  create: async (data) => {
    return await prisma.aoiTechnicianChecklist.create({
      data: {
        line: data.line || null,
        group_name: data.group_name || null,
        date: new Date(data.date),
        shift: data.shift,
        pre_aoi_program_full_name: data.pre_aoi_program_full_name || null,
        stencil_serial_no_b_side: data.stencil_serial_no_b_side || null,
        stencil_serial_no_a_side: data.stencil_serial_no_a_side || null,
        barcode_read_a_layer: data.barcode_read_a_layer || null,
        barcode_read_a_spi: data.barcode_read_a_spi || null,
        barcode_read_a_pre_aoi: data.barcode_read_a_pre_aoi || null,
        barcode_read_b_layer: data.barcode_read_b_layer || null,
        barcode_read_b_spi: data.barcode_read_b_spi || null,
        barcode_read_b_pre_aoi: data.barcode_read_b_pre_aoi || null,
        workorder_info_pre_aoi: data.workorder_info_pre_aoi || null,
        workorder_info_post_aoi: data.workorder_info_post_aoi || null,
        aoi_scan_tools_workorder_traceability: data.aoi_scan_tools_workorder_traceability || null,
        confirmation: data.confirmation || null,
        submitted_by: data.submitted_by || null,
        status: data.status || 'Production'
      }
    });
  },

  getAll: async () => {
    return await prisma.aoiTechnicianChecklist.findMany({
      orderBy: { created_at: 'desc' },
      take: 100
    });
  },

  getById: async (id) => {
    return await prisma.aoiTechnicianChecklist.findUnique({
      where: { id: parseInt(id) }
    });
  },

  getByDate: async (date) => {
    return await prisma.aoiTechnicianChecklist.findMany({
      where: { date: new Date(date) }
    });
  },

  getByLine: async (line) => {
    return await prisma.aoiTechnicianChecklist.findMany({
      where: { line: line }
    });
  }
};

module.exports = technicianChecklistModel;
