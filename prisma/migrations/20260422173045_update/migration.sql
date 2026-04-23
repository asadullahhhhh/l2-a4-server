/*
  Warnings:

  - Added the required column `paymentIntentId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "paymentIntentId" TEXT NOT NULL;
