-- CreateTable
CREATE TABLE "aoi_changeover_checksheet" (
    "id" SERIAL NOT NULL,
    "line" VARCHAR(50),
    "group_name" VARCHAR(100),
    "date" DATE NOT NULL,
    "shift" VARCHAR(50) NOT NULL,
    "model_name" VARCHAR(255),
    "spi_steel_stencil_suffix_match" VARCHAR(50),
    "spi_program_subpanel_serial_match" VARCHAR(50),
    "spi_recheck_pcab_polarity" VARCHAR(50),
    "spi_confirm_parameter_settings" VARCHAR(50),
    "spi_read_barcode_on" VARCHAR(50),
    "pre_aoi_eco_checklists" VARCHAR(50),
    "pre_aoi_program_model_modify" VARCHAR(50),
    "pre_aoi_vi_program_new_materia" VARCHAR(50),
    "pre_aoi_limit_defective_alarm" VARCHAR(50),
    "pre_aoi_test_program_bare_pcba" VARCHAR(50),
    "pre_aoi_bot_program_serial_number" VARCHAR(50),
    "pre_aoi_read_barcode_on" VARCHAR(50),
    "pre_aoi_confirm_materials_mounted" VARCHAR(50),
    "pre_aoi_delete_all_zones" VARCHAR(50),
    "post_aoi_equipment_model" VARCHAR(255),
    "post_aoi_eco_checklists" VARCHAR(50),
    "post_aoi_program_model_modify" VARCHAR(50),
    "post_aoi_recheck_chips_standard_models" VARCHAR(50),
    "post_aoi_scan_board_picture" VARCHAR(50),
    "post_aoi_limit_defective_alarm" VARCHAR(50),
    "post_aoi_confirm_polarity_shield" VARCHAR(50),
    "post_aoi_bot_program_serial_number" VARCHAR(50),
    "post_aoi_registered_standard_models_times" VARCHAR(50),
    "others_adjust_widths" VARCHAR(50),
    "others_add_test_standard_pcb_barcode" VARCHAR(50),
    "submitted_by" VARCHAR(150),
    "status" VARCHAR(50) DEFAULT 'Production',
    "approval_status" VARCHAR(50) DEFAULT 'ENG_PENDING',
    "designated_engineer_id" VARCHAR(100),
    "remarks" VARCHAR(1000),
    "engineer_remarks" VARCHAR(1000),
    "engineer_modified_fields" TEXT,
    "original_technician_data" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aoi_changeover_checksheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "aoi_changeover_checksheet_date_idx" ON "aoi_changeover_checksheet"("date");

-- CreateIndex
CREATE INDEX "aoi_changeover_checksheet_line_idx" ON "aoi_changeover_checksheet"("line");
