const prisma = require('../config/db');

const checkpointFields = [
  'laser_barcode_before_bot', 'laser_barcode_before_top', 'laser_barcode_after_bot', 'laser_barcode_after_top',
  'laser_pcb_text_before', 'laser_pcb_text_after',
  'spi_barcode_before_bot', 'spi_barcode_before_top', 'spi_barcode_after_bot', 'spi_barcode_after_top',
  'spi_mes_before_bot', 'spi_mes_before_top', 'spi_mes_after_bot', 'spi_mes_after_top',
  'pre_aoi_barcode_before_bot', 'pre_aoi_barcode_before_top', 'pre_aoi_barcode_after_bot', 'pre_aoi_barcode_after_top',
  'post_aoi_barcode_before_bot', 'post_aoi_barcode_before_top', 'post_aoi_barcode_after_bot', 'post_aoi_barcode_after_top',
  'password_function_pre_aoi_before', 'password_function_pre_aoi_after',
  'spi_fov_before', 'spi_fov_after',
  'pre_aoi_fov_before', 'pre_aoi_fov_after',
  'post_aoi_fov_before', 'post_aoi_fov_after',
  'pre_aoi_spc_before', 'pre_aoi_spc_after'
];

const functionCheckpointModel = {
  create: async (data) => {
    const insertData = {
      line: data.line || null,
      group_name: data.group_name || null,
      date: new Date(data.date),
      shift: data.shift,
      responsible_person: data.responsible_person || null,
      time: data.time || null,
      submitted_by: data.submitted_by || null,
      status: data.status || 'Production',
      approval_status: data.approval_status || 'ENG_PENDING',
      designated_engineer_id: data.designated_engineer_id || null,
      remarks: data.remarks || null,
      engineer_remarks: data.engineer_remarks || null,
      engineer_modified_fields: data.engineer_modified_fields || null,
      original_technician_data: data.original_technician_data || null
    };

    checkpointFields.forEach(field => {
      if (data[field] !== undefined) {
        insertData[field] = data[field];
      }
    });

    return await prisma.aoiFunctionCheckpoint.create({
      data: insertData
    });
  },

  update: async (id, data) => {
    const updateData = {
      line: data.line !== undefined ? data.line : undefined,
      group_name: data.group_name !== undefined ? data.group_name : undefined,
      date: data.date !== undefined ? new Date(data.date) : undefined,
      shift: data.shift !== undefined ? data.shift : undefined,
      responsible_person: data.responsible_person !== undefined ? data.responsible_person : undefined,
      time: data.time !== undefined ? data.time : undefined,
      status: data.status !== undefined ? data.status : undefined,
      approval_status: data.approval_status !== undefined ? data.approval_status : undefined,
      designated_engineer_id: data.designated_engineer_id !== undefined ? data.designated_engineer_id : undefined,
      remarks: data.remarks !== undefined ? data.remarks : undefined,
      engineer_remarks: data.engineer_remarks !== undefined ? data.engineer_remarks : undefined,
      engineer_modified_fields: data.engineer_modified_fields !== undefined ? data.engineer_modified_fields : undefined,
      original_technician_data: data.original_technician_data !== undefined ? data.original_technician_data : undefined
    };

    checkpointFields.forEach(field => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });

    return await prisma.aoiFunctionCheckpoint.update({
      where: { id: parseInt(id) },
      data: updateData
    });
  },

  getAll: async () => {
    return await prisma.aoiFunctionCheckpoint.findMany({
      orderBy: { created_at: 'desc' },
      take: 200
    });
  },

  getById: async (id) => {
    return await prisma.aoiFunctionCheckpoint.findUnique({
      where: { id: parseInt(id) }
    });
  },

  getByDate: async (date) => {
    return await prisma.aoiFunctionCheckpoint.findMany({
      where: { date: new Date(date) }
    });
  },

  getPendingForEngineer: async (username) => {
    return await prisma.aoiFunctionCheckpoint.findMany({
      where: {
        approval_status: 'ENG_PENDING',
        designated_engineer_id: username
      },
      orderBy: { created_at: 'desc' }
    });
  },

  getPendingForTechnician: async (username) => {
    return await prisma.aoiFunctionCheckpoint.findMany({
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
    return await prisma.aoiFunctionCheckpoint.findMany({
      where: {
        approval_status: {
          in: ['ENG_PENDING', 'DISAPPROVED']
        }
      },
      orderBy: { created_at: 'desc' }
    });
  },

  checkDuplicate: async (date, line, shift) => {
    return await prisma.aoiFunctionCheckpoint.findFirst({
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
    return await prisma.aoiFunctionCheckpoint.delete({
      where: { id: parseInt(id) }
    });
  }
};

module.exports = functionCheckpointModel;
