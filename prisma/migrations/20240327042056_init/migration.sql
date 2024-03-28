/*
  Warnings:

  - Added the required column `seq` to the `IdGenerator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auth` MODIFY `password` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `idgenerator` ADD COLUMN `seq` INTEGER NOT NULL;
