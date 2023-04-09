-- AlterTable
ALTER TABLE `Doctor` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DoctorSpecialization` ADD COLUMN `deletedAt` DATETIME(3) NULL;
