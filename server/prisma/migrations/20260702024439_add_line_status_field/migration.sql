-- AlterTable
ALTER TABLE "aoi_function_checkpoint" ADD COLUMN     "status" VARCHAR(50) DEFAULT 'Production';

-- AlterTable
ALTER TABLE "aoi_technician_checklist" ADD COLUMN     "status" VARCHAR(50) DEFAULT 'Production';
