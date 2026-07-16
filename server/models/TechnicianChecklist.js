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
        status: data.status || 'Production',
        approval_status: data.approval_status || 'ENG_PENDING',
        designated_engineer_id: data.designated_engineer_id || null,
        remarks: data.remarks || null,
        engineer_remarks: data.engineer_remarks || null,
        engineer_modified_fields: data.engineer_modified_fields || null,
        original_technician_data: data.original_technician_data || null
      }
    });
  },

  update: async (id, data) => {
    return await prisma.aoiTechnicianChecklist.update({
      where: { id: parseInt(id) },
      data: {
        line: data.line !== undefined ? data.line : undefined,
        group_name: data.group_name !== undefined ? data.group_name : undefined,
        date: data.date !== undefined ? new Date(data.date) : undefined,
        shift: data.shift !== undefined ? data.shift : undefined,
        pre_aoi_program_full_name: data.pre_aoi_program_full_name !== undefined ? data.pre_aoi_program_full_name : undefined,
        stencil_serial_no_b_side: data.stencil_serial_no_b_side !== undefined ? data.stencil_serial_no_b_side : undefined,
        stencil_serial_no_a_side: data.stencil_serial_no_a_side !== undefined ? data.stencil_serial_no_a_side : undefined,
        barcode_read_a_layer: data.barcode_read_a_layer !== undefined ? data.barcode_read_a_layer : undefined,
        barcode_read_a_spi: data.barcode_read_a_spi !== undefined ? data.barcode_read_a_spi : undefined,
        barcode_read_a_pre_aoi: data.barcode_read_a_pre_aoi !== undefined ? data.barcode_read_a_pre_aoi : undefined,
        barcode_read_b_layer: data.barcode_read_b_layer !== undefined ? data.barcode_read_b_layer : undefined,
        barcode_read_b_spi: data.barcode_read_b_spi !== undefined ? data.barcode_read_b_spi : undefined,
        barcode_read_b_pre_aoi: data.barcode_read_b_pre_aoi !== undefined ? data.barcode_read_b_pre_aoi : undefined,
        workorder_info_pre_aoi: data.workorder_info_pre_aoi !== undefined ? data.workorder_info_pre_aoi : undefined,
        workorder_info_post_aoi: data.workorder_info_post_aoi !== undefined ? data.workorder_info_post_aoi : undefined,
        aoi_scan_tools_workorder_traceability: data.aoi_scan_tools_workorder_traceability !== undefined ? data.aoi_scan_tools_workorder_traceability : undefined,
        confirmation: data.confirmation !== undefined ? data.confirmation : undefined,
        status: data.status !== undefined ? data.status : undefined,
        approval_status: data.approval_status !== undefined ? data.approval_status : undefined,
        designated_engineer_id: data.designated_engineer_id !== undefined ? data.designated_engineer_id : undefined,
        remarks: data.remarks !== undefined ? data.remarks : undefined,
        engineer_remarks: data.engineer_remarks !== undefined ? data.engineer_remarks : undefined,
        engineer_modified_fields: data.engineer_modified_fields !== undefined ? data.engineer_modified_fields : undefined,
        original_technician_data: data.original_technician_data !== undefined ? data.original_technician_data : undefined
      }
    });
  },

  getAll: async () => {
    return await prisma.aoiTechnicianChecklist.findMany({
      orderBy: { created_at: 'desc' },
      take: 200
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
  },

  getPendingForEngineer: async (username) => {
    return await prisma.aoiTechnicianChecklist.findMany({
      where: {
        approval_status: 'ENG_PENDING',
        designated_engineer_id: username
      },
      orderBy: { created_at: 'desc' }
    });
  },

  getPendingForTechnician: async (username) => {
    return await prisma.aoiTechnicianChecklist.findMany({
      where: {
        approval_status: 'DISAPPROVED',
        submitted_by: {
          endsWith: `(${username})`
        }
      },
      orderBy: { created_at: 'desc' }
    });
  },

  getAllPending: async () => {
    return await prisma.aoiTechnicianChecklist.findMany({
      where: {
        approval_status: {
          in: ['ENG_PENDING', 'DISAPPROVED']
        }
      },
      orderBy: { created_at: 'desc' }
    });
  },

  checkDuplicate: async (date, line, shift) => {
    return await prisma.aoiTechnicianChecklist.findFirst({
      where: {
        date: new Date(date),
        line: line,
        shift: shift,
        approval_status: {
          not: 'DISAPPROVED'
        }
      }
    });
  },

  delete: async (id) => {
    return await prisma.aoiTechnicianChecklist.delete({
      where: { id: parseInt(id) }
    });
  }
};

module.exports = technicianChecklistModel;
