/*
  Warnings:

  - The `tempo_trabalhado` column on the `dias` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `saldo_dia` column on the `dias` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `dias` DROP COLUMN `tempo_trabalhado`,
    ADD COLUMN `tempo_trabalhado` INTEGER NULL,
    DROP COLUMN `saldo_dia`,
    ADD COLUMN `saldo_dia` INTEGER NULL;
