const pool = require('../config/db');

const technicianChecklistModel = {
  create: async (data) => {
    const {
      line, group_name, date, shift, pre_aoi_program_full_name, stencil_serial_no_b_side, stencil_serial_no_a_side,
      barcode_read_a_layer, barcode_read_a_spi, barcode_read_b_layer, barcode_read_b_spi,
      workorder_info_pre_aoi, workorder_info_post_aoi,
      aoi_scan_tools_workorder_traceability, confirmation
    } = data;

    const query = `
      INSERT INTO aoi_technician_checklist (
        line, group_name, date, shift, pre_aoi_program_full_name, stencil_serial_no_b_side, stencil_serial_no_a_side,
        barcode_read_a_layer, barcode_read_a_spi, barcode_read_b_layer, barcode_read_b_spi,
        workorder_info_pre_aoi, workorder_info_post_aoi,
        aoi_scan_tools_workorder_traceability, confirmation
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *;
    `;

    const values = [
      line, group_name, date, shift, pre_aoi_program_full_name, stencil_serial_no_b_side, stencil_serial_no_a_side,
      barcode_read_a_layer, barcode_read_a_spi, barcode_read_b_layer, barcode_read_b_spi,
      workorder_info_pre_aoi, workorder_info_post_aoi,
      aoi_scan_tools_workorder_traceability, confirmation
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getAll: async () => {
    const result = await pool.query('SELECT * FROM aoi_technician_checklist ORDER BY date DESC LIMIT 100');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM aoi_technician_checklist WHERE id = $1', [id]);
    return result.rows[0];
  },

  getByDate: async (date) => {
    const result = await pool.query('SELECT * FROM aoi_technician_checklist WHERE date = $1', [date]);
    return result.rows;
  },

  getByLine: async (line) => {
    const result = await pool.query('SELECT * FROM aoi_technician_checklist WHERE line = $1', [line]);
    return result.rows;
  }
};

module.exports = technicianChecklistModel;
