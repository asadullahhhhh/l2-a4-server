/*
  Warnings:

  - Added the required column `name` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;
