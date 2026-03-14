/*
  Warnings:

  - You are about to drop the column `isFeature` on the `meals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "meals" DROP COLUMN "isFeature",
ADD COLUMN     "is_feature" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "is_vegetarian" SET DEFAULT false,
ALTER COLUMN "is_vegan" SET DEFAULT false,
ALTER COLUMN "is_halal" SET DEFAULT false,
ALTER COLUMN "is_gluten_free" SET DEFAULT false;
