-- CreateTable
CREATE TABLE "app_activity_logs" (
    "id" SERIAL NOT NULL,
    "activity_type" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "public_ip" VARCHAR(100),
    "details" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "app_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "app_activity_logs_created_at_idx" ON "app_activity_logs"("created_at");

-- CreateIndex
CREATE INDEX "app_activity_logs_activity_type_idx" ON "app_activity_logs"("activity_type");
