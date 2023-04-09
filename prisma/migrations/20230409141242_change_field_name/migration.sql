/*
  Warnings:

  - You are about to drop the column `doctorSpecalizationId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the `DoctorSpecalization` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `doctorSpecializationId` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Doctor` DROP FOREIGN KEY `Doctor_doctorSpecalizationId_fkey`;

-- AlterTable
ALTER TABLE `Doctor` DROP COLUMN `doctorSpecalizationId`,
    ADD COLUMN `doctorSpecializationId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `DoctorSpecalization`;

-- CreateTable
CREATE TABLE `DoctorSpecialization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_doctorSpecializationId_fkey` FOREIGN KEY (`doctorSpecializationId`) REFERENCES `DoctorSpecialization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
