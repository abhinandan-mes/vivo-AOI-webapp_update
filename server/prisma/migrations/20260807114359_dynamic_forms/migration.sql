CREATE TABLE "checksheet_templates" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "dynamic_data" TEXT,
    CONSTRAINT "checksheet_templates_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "checksheet_templates_name_key" ON "checksheet_templates"("name");
ALTER TABLE "aoi_changeover_checksheet" ADD COLUMN "dynamic_data" TEXT;
ALTER TABLE "aoi_function_checkpoint" ADD COLUMN "dynamic_data" TEXT;
ALTER TABLE "aoi_technician_checklist" ADD COLUMN "dynamic_data" TEXT;
