const prisma = require('../config/db');

const changeoverFields = [
  'spi_steel_stencil_suffix_match',
  'spi_program_subpanel_serial_match',
  'spi_recheck_pcab_polarity',
  'spi_confirm_parameter_settings',
  'spi_read_barcode_on',
  'pre_aoi_eco_checklists',
  'pre_aoi_program_model_modify',
  'pre_aoi_vi_program_new_materia',
  'pre_aoi_limit_defective_alarm',
  'pre_aoi_test_program_bare_pcba',
  'pre_aoi_bot_program_serial_number',
  'pre_aoi_read_barcode_on',
  'pre_aoi_confirm_materials_mounted',
  'pre_aoi_delete_all_zones',
  'post_aoi_equipment_model',
  'post_aoi_eco_checklists',
  'post_aoi_program_model_modify',
  'post_aoi_recheck_chips_standard_models',
  'post_aoi_scan_board_picture',
  'post_aoi_limit_defective_alarm',
  'post_aoi_confirm_polarity_shield',
  'post_aoi_bot_program_serial_number',
  'post_aoi_registered_standard_models_times',
  'others_adjust_widths',
  'others_add_test_standard_pcb_barcode'
];

const changeoverChecksheetModel = {
  create: async (data) => {
    const insertData = {
      line: data.line || null,
      group_name: data.group_name || null,
      date: new Date(data.date),
      shift: data.shift,
      model_name: data.model_name || null,
      model_code: data.model_code || null,
      submitted_by: data.submitted_by || null,
      status: data.status || 'Production',
      approval_status: data.approval_status || 'ENG_PENDING',
      designated_engineer_id: data.designated_engineer_id || null,
      remarks: data.remarks || null,
      changeover_type: data.changeover_type || null,
      engineer_remarks: data.engineer_remarks || null,
      engineer_modified_fields: data.engineer_modified_fields || null,
      original_technician_data: data.original_technician_data || null
    };

    changeoverFields.forEach(field => {
      if (data[field] !== undefined) {
        insertData[field] = data[field];
      }
    });

    return await prisma.aoiChangeoverChecksheet.create({
      data: insertData
    });
  },

  update: async (id, data) => {
    const updateData = {
      line: data.line !== undefined ? data.line : undefined,
      group_name: data.group_name !== undefined ? data.group_name : undefined,
      date: data.date !== undefined ? new Date(data.date) : undefined,
      shift: data.shift !== undefined ? data.shift : undefined,
      model_name: data.model_name !== undefined ? data.model_name : undefined,
      model_code: data.model_code !== undefined ? data.model_code : undefined,
      status: data.status !== undefined ? data.status : undefined,
      approval_status: data.approval_status !== undefined ? data.approval_status : undefined,
      designated_engineer_id: data.designated_engineer_id !== undefined ? data.designated_engineer_id : undefined,
      remarks: data.remarks !== undefined ? data.remarks : undefined,
      changeover_type: data.changeover_type !== undefined ? data.changeover_type : undefined,
      engineer_remarks: data.engineer_remarks !== undefined ? data.engineer_remarks : undefined,
      engineer_modified_fields: data.engineer_modified_fields !== undefined ? data.engineer_modified_fields : undefined,
      original_technician_data: data.original_technician_data !== undefined ? data.original_technician_data : undefined
    };

    changeoverFields.forEach(field => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });

    return await prisma.aoiChangeoverChecksheet.update({
      where: { id: parseInt(id) },
      data: updateData
    });
  },

  getAll: async () => {
    return await prisma.aoiChangeoverChecksheet.findMany({
      orderBy: { created_at: 'desc' },
      take: 200
    });
  },

  getById: async (id) => {
    return await prisma.aoiChangeoverChecksheet.findUnique({
      where: { id: parseInt(id) }
    });
  },

  getByDate: async (date) => {
    return await prisma.aoiChangeoverChecksheet.findMany({
      where: { date: new Date(date) }
    });
  },

  getPendingForEngineer: async (username) => {
    return await prisma.aoiChangeoverChecksheet.findMany({
      where: {
        approval_status: 'ENG_PENDING',
        designated_engineer_id: username
      },
      orderBy: { created_at: 'desc' }
    });
  },

  getPendingForTechnician: async (username) => {
    return await prisma.aoiChangeoverChecksheet.findMany({
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
    return await prisma.aoiChangeoverChecksheet.findMany({
      where: {
        approval_status: {
          in: ['ENG_PENDING', 'DISAPPROVED']
        }
      },
      orderBy: { created_at: 'desc' }
    });
  },

  checkDuplicate: async (date, line, shift) => {
    return await prisma.aoiChangeoverChecksheet.findFirst({
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
    return await prisma.aoiChangeoverChecksheet.delete({
      where: { id: parseInt(id) }
    });
  }
};

module.exports = changeoverChecksheetModel;
