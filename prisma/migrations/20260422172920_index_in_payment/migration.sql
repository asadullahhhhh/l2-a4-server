-- CreateIndex
CREATE INDEX "payment_user_id_idx" ON "payment"("user_id");

-- CreateIndex
CREATE INDEX "payment_order_id_idx" ON "payment"("order_id");
