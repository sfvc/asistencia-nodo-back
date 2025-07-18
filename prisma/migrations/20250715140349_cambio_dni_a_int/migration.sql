/*
  Warnings:

  - Changed the type of `dni` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "dni",
ADD COLUMN     "dni" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Personal_dni_key" ON "Personal"("dni");
