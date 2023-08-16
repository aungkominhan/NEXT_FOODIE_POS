/*
  Warnings:

  - Added the required column `assetUrl` to the `Tables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tables" ADD COLUMN     "assetUrl" TEXT NOT NULL;
