/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `provider_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "provider_profile_user_id_key" ON "provider_profile"("user_id");
