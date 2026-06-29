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

  getAll: async () => {
    return await prisma.aoiFunctionCheckpoint.findMany({
      orderBy: { date: 'desc' },
      take: 100
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
  }
};

module.exports = functionCheckpointModel;
