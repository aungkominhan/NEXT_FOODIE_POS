/*
  Warnings:

  - Made the column `address` on table `Companies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Companies" ALTER COLUMN "address" SET NOT NULL;
