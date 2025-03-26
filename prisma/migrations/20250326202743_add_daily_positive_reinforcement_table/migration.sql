-- CreateTable
CREATE TABLE "DailyPositiveReinforcement" (
    "id" TEXT NOT NULL,
    "positiveThing" TEXT NOT NULL,
    "conquest" TEXT NOT NULL,
    "kindness" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "DailyPositiveReinforcement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyPositiveReinforcement" ADD CONSTRAINT "DailyPositiveReinforcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
