-- CreateTable
CREATE TABLE "aoi_function_checkpoint" (
    "id" SERIAL NOT NULL,
    "line" VARCHAR(50),
    "group_name" VARCHAR(100),
    "date" DATE NOT NULL,
    "shift" VARCHAR(50) NOT NULL,
    "responsible_person" VARCHAR(100),
    "time" VARCHAR(50),
    "laser_barcode_before_bot" BOOLEAN,
    "laser_barcode_before_top" BOOLEAN,
    "laser_barcode_after_bot" BOOLEAN,
    "laser_barcode_after_top" BOOLEAN,
    "laser_pcb_text_before" BOOLEAN,
    "laser_pcb_text_after" BOOLEAN,
    "spi_barcode_before_bot" BOOLEAN,
    "spi_barcode_before_top" BOOLEAN,
    "spi_barcode_after_bot" BOOLEAN,
    "spi_barcode_after_top" BOOLEAN,
    "spi_mes_before_bot" BOOLEAN,
    "spi_mes_before_top" BOOLEAN,
    "spi_mes_after_bot" BOOLEAN,
    "spi_mes_after_top" BOOLEAN,
    "pre_aoi_barcode_before_bot" BOOLEAN,
    "pre_aoi_barcode_before_top" BOOLEAN,
    "pre_aoi_barcode_after_bot" BOOLEAN,
    "pre_aoi_barcode_after_top" BOOLEAN,
    "post_aoi_barcode_before_bot" BOOLEAN,
    "post_aoi_barcode_before_top" BOOLEAN,
    "post_aoi_barcode_after_bot" BOOLEAN,
    "post_aoi_barcode_after_top" BOOLEAN,
    "password_function_pre_aoi_before" BOOLEAN,
    "password_function_pre_aoi_after" BOOLEAN,
    "spi_fov_before" BOOLEAN,
    "spi_fov_after" BOOLEAN,
    "pre_aoi_fov_before" BOOLEAN,
    "pre_aoi_fov_after" BOOLEAN,
    "post_aoi_fov_before" BOOLEAN,
    "post_aoi_fov_after" BOOLEAN,
    "pre_aoi_spc_before" BOOLEAN,
    "pre_aoi_spc_after" BOOLEAN,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aoi_function_checkpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aoi_technician_checklist" (
    "id" SERIAL NOT NULL,
    "line" VARCHAR(50),
    "group_name" VARCHAR(100),
    "date" DATE NOT NULL,
    "shift" VARCHAR(50) NOT NULL,
    "pre_aoi_program_full_name" VARCHAR(255),
    "stencil_serial_no_b_side" VARCHAR(100),
    "stencil_serial_no_a_side" VARCHAR(100),
    "barcode_read_a_layer" VARCHAR(50),
    "barcode_read_a_spi" VARCHAR(50),
    "barcode_read_b_layer" VARCHAR(50),
    "barcode_read_b_spi" VARCHAR(50),
    "workorder_info_pre_aoi" VARCHAR(255),
    "workorder_info_post_aoi" VARCHAR(255),
    "aoi_scan_tools_workorder_traceability" VARCHAR(255),
    "confirmation" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aoi_technician_checklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "role" VARCHAR(50) NOT NULL DEFAULT 'operator',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "app_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_sessions" (
    "session_id" UUID NOT NULL,
    "user_id" INTEGER NOT NULL,
    "public_ip" VARCHAR(100),
    "login_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logout_time" TIMESTAMP(6),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',

    CONSTRAINT "app_sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateIndex
CREATE INDEX "aoi_function_checkpoint_date_idx" ON "aoi_function_checkpoint"("date");

-- CreateIndex
CREATE INDEX "aoi_function_checkpoint_shift_idx" ON "aoi_function_checkpoint"("shift");

-- CreateIndex
CREATE INDEX "aoi_function_checkpoint_line_idx" ON "aoi_function_checkpoint"("line");

-- CreateIndex
CREATE INDEX "aoi_technician_checklist_date_idx" ON "aoi_technician_checklist"("date");

-- CreateIndex
CREATE INDEX "aoi_technician_checklist_line_idx" ON "aoi_technician_checklist"("line");

-- CreateIndex
CREATE UNIQUE INDEX "app_users_username_key" ON "app_users"("username");

-- AddForeignKey
ALTER TABLE "app_sessions" ADD CONSTRAINT "app_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
