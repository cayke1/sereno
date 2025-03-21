-- CreateTable
CREATE TABLE "Feeling" (
    "id" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "predominant_feeling" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Feeling_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feeling_id_key" ON "Feeling"("id");
