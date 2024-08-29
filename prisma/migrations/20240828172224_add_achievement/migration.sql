-- CreateEnum
CREATE TYPE "AchievementCategory" AS ENUM ('TIME', 'ROOM', 'ISSUES');

-- CreateTable
CREATE TABLE "Achievement" (
    "achievementId" SERIAL NOT NULL,
    "category" "AchievementCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "pointsValue" INTEGER,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("achievementId")
);

-- CreateTable
CREATE TABLE "AchievementOnUsers" (
    "achievementId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AchievementOnUsers_pkey" PRIMARY KEY ("achievementId","userId")
);

-- AddForeignKey
ALTER TABLE "AchievementOnUsers" ADD CONSTRAINT "AchievementOnUsers_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("achievementId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementOnUsers" ADD CONSTRAINT "AchievementOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
