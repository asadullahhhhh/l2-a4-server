/*
Warnings:

- You are about to drop the `Meals` table. If the table is not empty, all the data it contains will be lost.

 */
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM (
    'PLACED',
    'PREPARING',
    'READY',
    'DELIVERED',
    'CANCELLED'
);

-- DropTable
DROP TABLE "Meals";

-- CreateTable
CREATE TABLE
    "user" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "emailVerified" BOOLEAN NOT NULL DEFAULT false,
        "image" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "role" TEXT DEFAULT 'USER',
        "status" TEXT DEFAULT 'ACTICE',
        CONSTRAINT "user_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "session" (
        "id" TEXT NOT NULL,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "token" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "ipAddress" TEXT,
        "userAgent" TEXT,
        "userId" TEXT NOT NULL,
        CONSTRAINT "session_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "account" (
        "id" TEXT NOT NULL,
        "accountId" TEXT NOT NULL,
        "providerId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "accessToken" TEXT,
        "refreshToken" TEXT,
        "idToken" TEXT,
        "accessTokenExpiresAt" TIMESTAMP(3),
        "refreshTokenExpiresAt" TIMESTAMP(3),
        "scope" TEXT,
        "password" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "account_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "verification" (
        "id" TEXT NOT NULL,
        "identifier" TEXT NOT NULL,
        "value" TEXT NOT NULL,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "categories" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "meals" (
        "id" TEXT NOT NULL,
        "provider_id" TEXT NOT NULL,
        "category_id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "price" DOUBLE PRECISION NOT NULL,
        "image_url" TEXT NOT NULL,
        "is_available" BOOLEAN NOT NULL DEFAULT true,
        "is_vegetarian" BOOLEAN NOT NULL,
        "is_vegan" BOOLEAN NOT NULL,
        "is_halal" BOOLEAN NOT NULL,
        "is_gluten_free" BOOLEAN NOT NULL,
        "isFeature" BOOLEAN NOT NULL DEFAULT false,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "order_items" (
        "id" TEXT NOT NULL,
        "order_id" TEXT NOT NULL,
        "meal_id" TEXT NOT NULL,
        "quantity" INTEGER NOT NULL,
        "price" DECIMAL(10, 2) NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "orders" (
        "id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "provider_id" TEXT NOT NULL,
        "status" "OrderStatus" NOT NULL DEFAULT 'PREPARING',
        "total_price" DECIMAL(10, 2) NOT NULL,
        "delivery_address" TEXT NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "provider_profile" (
        "id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "resturent_name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "address" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "logo_url" TEXT NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "provider_profile_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "reviews" (
        "id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "meal_id" TEXT NOT NULL,
        "rating" INTEGER NOT NULL,
        "comment" TEXT NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
    );

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user" ("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session" ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session" ("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account" ("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");

-- CreateIndex
CREATE INDEX "meals_provider_id_idx" ON "meals" ("provider_id");

-- CreateIndex
CREATE INDEX "meals_category_id_idx" ON "meals" ("category_id");

-- CreateIndex
CREATE INDEX "order_items_order_id_idx" ON "order_items" ("order_id");

-- CreateIndex
CREATE INDEX "order_items_meal_id_idx" ON "order_items" ("meal_id");

-- CreateIndex
CREATE INDEX "orders_user_id_idx" ON "orders" ("user_id");

-- CreateIndex
CREATE INDEX "orders_provider_id_idx" ON "orders" ("provider_id");

-- CreateIndex
CREATE INDEX "provider_profile_user_id_idx" ON "provider_profile" ("user_id");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "reviews" ("user_id");

-- CreateIndex
CREATE INDEX "reviews_meal_id_idx" ON "reviews" ("meal_id");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider_profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider_profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals" ("id") ON DELETE CASCADE ON UPDATE CASCADE;