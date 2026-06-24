const pool = require('../config/db');

const checkpointFields = [
  'laser_barcode_before_bot', 'laser_barcode_before_top', 'laser_barcode_after_bot', 'laser_barcode_after_top',
  'spi_barcode_before_bot', 'spi_barcode_before_top', 'spi_barcode_after_bot', 'spi_barcode_after_top',
  'spi_mes_before_bot', 'spi_mes_before_top', 'spi_mes_after_bot', 'spi_mes_after_top',
  'pre_aoi_barcode_before_bot', 'pre_aoi_barcode_before_top', 'pre_aoi_barcode_after_bot', 'pre_aoi_barcode_after_top',
  'post_aoi_barcode_before_bot', 'post_aoi_barcode_before_top', 'post_aoi_barcode_after_bot', 'post_aoi_barcode_after_top',
  'password_function_pre_aoi_before_bot', 'password_function_pre_aoi_before_top', 'password_function_pre_aoi_after_bot', 'password_function_pre_aoi_after_top',
  'spi_fov_before', 'spi_fov_after',
  'pre_aoi_fov_before', 'pre_aoi_fov_after',
  'post_aoi_fov_before', 'post_aoi_fov_after',
  'pre_aoi_spc_before', 'pre_aoi_spc_after'
];

const functionCheckpointModel = {
  create: async (data) => {
    const columns = ['line', 'group_name', 'date', 'shift', 'responsible_person', 'time', ...checkpointFields];
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
    const values = columns.map(column => data[column]);
    const result = await pool.query(
      `INSERT INTO aoi_function_checkpoint (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await pool.query('SELECT * FROM aoi_function_checkpoint ORDER BY date DESC LIMIT 100');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM aoi_function_checkpoint WHERE id = $1', [id]);
    return result.rows[0];
  },

  getByDate: async (date) => {
    const result = await pool.query('SELECT * FROM aoi_function_checkpoint WHERE date = $1', [date]);
    return result.rows;
  }
};

module.exports = functionCheckpointModel;
