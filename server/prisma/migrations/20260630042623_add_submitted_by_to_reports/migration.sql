/*
  Warnings:

  - You are about to drop the column `confirmed_by` on the `aoi_technician_checklist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "aoi_function_checkpoint" ADD COLUMN     "submitted_by" VARCHAR(150);

-- AlterTable
ALTER TABLE "aoi_technician_checklist" DROP COLUMN "confirmed_by",
ADD COLUMN     "submitted_by" VARCHAR(150);
