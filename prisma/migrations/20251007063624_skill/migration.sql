/*
  Warnings:

  - You are about to drop the column `skills` on the `About` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "skills",
ADD COLUMN     "photo" TEXT;

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "aboutId" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;
