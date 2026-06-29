const pool = require('./db');
const bcrypt = require('bcrypt');

const schemaQueries = [
  `CREATE TABLE IF NOT EXISTS aoi_function_checkpoint (
    id SERIAL PRIMARY KEY,
    line VARCHAR(50), group_name VARCHAR(100), date DATE NOT NULL, shift VARCHAR(50) NOT NULL,
    responsible_person VARCHAR(100), time VARCHAR(50),
    laser_barcode_before_bot BOOLEAN, laser_barcode_before_top BOOLEAN, laser_barcode_after_bot BOOLEAN, laser_barcode_after_top BOOLEAN,
    laser_pcb_text_before BOOLEAN, laser_pcb_text_after BOOLEAN,
    spi_barcode_before_bot BOOLEAN, spi_barcode_before_top BOOLEAN, spi_barcode_after_bot BOOLEAN, spi_barcode_after_top BOOLEAN,
    spi_mes_before_bot BOOLEAN, spi_mes_before_top BOOLEAN, spi_mes_after_bot BOOLEAN, spi_mes_after_top BOOLEAN,
    pre_aoi_barcode_before_bot BOOLEAN, pre_aoi_barcode_before_top BOOLEAN, pre_aoi_barcode_after_bot BOOLEAN, pre_aoi_barcode_after_top BOOLEAN,
    post_aoi_barcode_before_bot BOOLEAN, post_aoi_barcode_before_top BOOLEAN, post_aoi_barcode_after_bot BOOLEAN, post_aoi_barcode_after_top BOOLEAN,
    password_function_pre_aoi_before BOOLEAN, password_function_pre_aoi_after BOOLEAN,
    spi_fov_before BOOLEAN, spi_fov_after BOOLEAN,
    pre_aoi_fov_before BOOLEAN, pre_aoi_fov_after BOOLEAN,
    post_aoi_fov_before BOOLEAN, post_aoi_fov_after BOOLEAN,
    pre_aoi_spc_before BOOLEAN, pre_aoi_spc_after BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS aoi_technician_checklist (
    id SERIAL PRIMARY KEY, line VARCHAR(50), group_name VARCHAR(100), date DATE NOT NULL, shift VARCHAR(50) NOT NULL,
    pre_aoi_program_full_name VARCHAR(255), stencil_serial_no VARCHAR(100),
    stencil_serial_no_b_side VARCHAR(100), stencil_serial_no_a_side VARCHAR(100),
    barcode_read_a_layer VARCHAR(50), barcode_read_a_spi VARCHAR(50), barcode_read_b_layer VARCHAR(50), barcode_read_b_spi VARCHAR(50),
    workorder_info_pre_aoi VARCHAR(255), workorder_info_post_aoi VARCHAR(255),
    aoi_scan_tools_workorder_traceability VARCHAR(255), confirmation VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS app_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) DEFAULT 'operator',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `ALTER TABLE aoi_function_checkpoint
    ADD COLUMN IF NOT EXISTS line VARCHAR(50), ADD COLUMN IF NOT EXISTS group_name VARCHAR(100),
    ADD COLUMN IF NOT EXISTS laser_pcb_text_before BOOLEAN, ADD COLUMN IF NOT EXISTS laser_pcb_text_after BOOLEAN,
    ADD COLUMN IF NOT EXISTS post_aoi_barcode_before_bot BOOLEAN, ADD COLUMN IF NOT EXISTS post_aoi_barcode_before_top BOOLEAN,
    ADD COLUMN IF NOT EXISTS post_aoi_barcode_after_bot BOOLEAN, ADD COLUMN IF NOT EXISTS post_aoi_barcode_after_top BOOLEAN,
    ADD COLUMN IF NOT EXISTS password_function_pre_aoi_before BOOLEAN, ADD COLUMN IF NOT EXISTS password_function_pre_aoi_after BOOLEAN,
    ADD COLUMN IF NOT EXISTS spi_fov_before BOOLEAN, ADD COLUMN IF NOT EXISTS spi_fov_after BOOLEAN,
    ADD COLUMN IF NOT EXISTS pre_aoi_fov_before BOOLEAN, ADD COLUMN IF NOT EXISTS pre_aoi_fov_after BOOLEAN,
    ADD COLUMN IF NOT EXISTS post_aoi_fov_before BOOLEAN, ADD COLUMN IF NOT EXISTS post_aoi_fov_after BOOLEAN,
    ADD COLUMN IF NOT EXISTS pre_aoi_spc_before BOOLEAN, ADD COLUMN IF NOT EXISTS pre_aoi_spc_after BOOLEAN`,
  `ALTER TABLE aoi_technician_checklist
    ADD COLUMN IF NOT EXISTS group_name VARCHAR(100),
    ADD COLUMN IF NOT EXISTS stencil_serial_no_b_side VARCHAR(100),
    ADD COLUMN IF NOT EXISTS stencil_serial_no_a_side VARCHAR(100)`,
  `DO $$
  BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='aoi_function_checkpoint' AND column_name='spi_fov_before_bot') THEN
      UPDATE aoi_function_checkpoint SET
        spi_fov_before = COALESCE(spi_fov_before, COALESCE(spi_fov_before_bot, FALSE) AND COALESCE(spi_fov_before_top, FALSE)),
        spi_fov_after = COALESCE(spi_fov_after, COALESCE(spi_fov_after_bot, FALSE) AND COALESCE(spi_fov_after_top, FALSE)),
        pre_aoi_fov_before = COALESCE(pre_aoi_fov_before, COALESCE(pre_aoi_fov_before_bot, FALSE) AND COALESCE(pre_aoi_fov_before_top, FALSE)),
        pre_aoi_fov_after = COALESCE(pre_aoi_fov_after, COALESCE(pre_aoi_fov_after_bot, FALSE) AND COALESCE(pre_aoi_fov_after_top, FALSE)),
        post_aoi_fov_before = COALESCE(post_aoi_fov_before, COALESCE(post_aoi_enabled_before_bot, FALSE) AND COALESCE(post_aoi_enabled_before_top, FALSE)),
        post_aoi_fov_after = COALESCE(post_aoi_fov_after, COALESCE(post_aoi_enabled_after_bot, FALSE) AND COALESCE(post_aoi_enabled_after_top, FALSE)),
        pre_aoi_spc_before = COALESCE(pre_aoi_spc_before, COALESCE(pre_aoi_spc_before_bot, FALSE) AND COALESCE(pre_aoi_spc_before_top, FALSE)),
        pre_aoi_spc_after = COALESCE(pre_aoi_spc_after, COALESCE(pre_aoi_spc_after_bot, FALSE) AND COALESCE(pre_aoi_spc_after_top, FALSE));
    END IF;
  END $$`,
  `ALTER TABLE aoi_function_checkpoint
    DROP COLUMN IF EXISTS spi_fov_before_bot, DROP COLUMN IF EXISTS spi_fov_before_top,
    DROP COLUMN IF EXISTS spi_fov_after_bot, DROP COLUMN IF EXISTS spi_fov_after_top,
    DROP COLUMN IF EXISTS pre_aoi_fov_before_bot, DROP COLUMN IF EXISTS pre_aoi_fov_before_top,
    DROP COLUMN IF EXISTS pre_aoi_fov_after_bot, DROP COLUMN IF EXISTS pre_aoi_fov_after_top,
    DROP COLUMN IF EXISTS post_aoi_enabled_before_bot, DROP COLUMN IF EXISTS post_aoi_enabled_before_top,
    DROP COLUMN IF EXISTS post_aoi_enabled_after_bot, DROP COLUMN IF EXISTS post_aoi_enabled_after_top,
    DROP COLUMN IF EXISTS pre_aoi_spc_before_bot, DROP COLUMN IF EXISTS pre_aoi_spc_before_top,
    DROP COLUMN IF EXISTS pre_aoi_spc_after_bot, DROP COLUMN IF EXISTS pre_aoi_spc_after_top`,
  `CREATE INDEX IF NOT EXISTS idx_function_checkpoint_date ON aoi_function_checkpoint(date)`,
  `CREATE INDEX IF NOT EXISTS idx_function_checkpoint_shift ON aoi_function_checkpoint(shift)`,
  `CREATE INDEX IF NOT EXISTS idx_function_checkpoint_line ON aoi_function_checkpoint(line)`,
  `CREATE INDEX IF NOT EXISTS idx_technician_checklist_date ON aoi_technician_checklist(date)`,
  `CREATE INDEX IF NOT EXISTS idx_technician_checklist_line ON aoi_technician_checklist(line)`
];

async function initializeDatabase() {
  try {
    for (const query of schemaQueries) await pool.query(query);
    const defaultUsername = process.env.AUTH_DEFAULT_USERNAME || 'abhinandan';
    const defaultPassword = process.env.AUTH_DEFAULT_PASSWORD || '95003989';
    const defaultName = process.env.AUTH_DEFAULT_NAME || 'Abhinandan Kumar';
    const passwordHash = await bcrypt.hash(defaultPassword, 10);
    await pool.query(
      `INSERT INTO app_users (username, password_hash, full_name, role)
       VALUES ($1, $2, $3, 'super_admin')
       ON CONFLICT (username) DO UPDATE SET
         password_hash = EXCLUDED.password_hash,
         full_name = EXCLUDED.full_name,
         role = EXCLUDED.role`,
      [defaultUsername, passwordHash, defaultName]
    );
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating database tables:', error);
    throw error;
  }
}

module.exports = initializeDatabase;
