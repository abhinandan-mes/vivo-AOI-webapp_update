-- AlterTable
ALTER TABLE "aoi_function_checkpoint" ADD COLUMN     "approval_status" VARCHAR(50) DEFAULT 'ENG_PENDING',
ADD COLUMN     "designated_engineer_id" VARCHAR(100),
ADD COLUMN     "engineer_modified_fields" TEXT,
ADD COLUMN     "engineer_remarks" VARCHAR(1000),
ADD COLUMN     "original_technician_data" TEXT,
ADD COLUMN     "remarks" VARCHAR(1000);

-- AlterTable
ALTER TABLE "aoi_technician_checklist" ADD COLUMN     "approval_status" VARCHAR(50) DEFAULT 'ENG_PENDING',
ADD COLUMN     "designated_engineer_id" VARCHAR(100),
ADD COLUMN     "engineer_modified_fields" TEXT,
ADD COLUMN     "engineer_remarks" VARCHAR(1000),
ADD COLUMN     "original_technician_data" TEXT,
ADD COLUMN     "remarks" VARCHAR(1000);
