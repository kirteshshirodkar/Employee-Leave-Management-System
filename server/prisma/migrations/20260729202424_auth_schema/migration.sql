/*
  Warnings:

  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employee_email_key";

-- DropIndex
DROP INDEX "Employee_employeeId_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "email",
DROP COLUMN "employeeId",
DROP COLUMN "fullName",
DROP COLUMN "isVerified",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "Employee"("username");
