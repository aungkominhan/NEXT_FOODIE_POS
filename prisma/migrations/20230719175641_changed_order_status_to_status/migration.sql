/*
  Warnings:

  - You are about to drop the column `orderStatus` on the `Orderlines` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orderlines" DROP COLUMN "orderStatus",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';
