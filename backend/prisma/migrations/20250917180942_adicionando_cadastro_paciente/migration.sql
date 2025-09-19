/*
  Warnings:

  - The values [PACIENTE] on the enum `Papel` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `data` on the `atendentes` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `atendentes` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `medicos` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `triagens` table. All the data in the column will be lost.
  - You are about to drop the column `paciente_id` on the `triagens` table. All the data in the column will be lost.
  - You are about to drop the column `prioridade` on the `triagens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cadastro_id]` on the table `triagens` will be added. If there are existing duplicate values, this will fail.
  - Made the column `sus` on table `pacientes` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `cadastro_id` to the `triagens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StatusTriagem" AS ENUM ('AGUARDANDO', 'EM_ANDAMENTO', 'CONCLUIDA');

-- CreateEnum
CREATE TYPE "public"."StatusAtendimento" AS ENUM ('AGUARDANDO', 'EM_ANDAMENTO', 'CONCLUIDO');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Papel_new" AS ENUM ('ATENDENTE', 'MEDICO', 'ADMIN');
ALTER TABLE "public"."usuarios" ALTER COLUMN "papel" DROP DEFAULT;
ALTER TABLE "public"."usuarios" ALTER COLUMN "papel" TYPE "public"."Papel_new" USING ("papel"::text::"public"."Papel_new");
ALTER TYPE "public"."Papel" RENAME TO "Papel_old";
ALTER TYPE "public"."Papel_new" RENAME TO "Papel";
DROP TYPE "public"."Papel_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."pacientes" DROP CONSTRAINT "pacientes_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."triagens" DROP CONSTRAINT "triagens_paciente_id_fkey";

-- DropIndex
DROP INDEX "public"."pacientes_usuario_id_key";

-- AlterTable
ALTER TABLE "public"."atendentes" DROP COLUMN "data",
DROP COLUMN "nome";

-- AlterTable
ALTER TABLE "public"."atendimentos" ADD COLUMN     "data_fim" TIMESTAMP(3),
ADD COLUMN     "data_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."medicos" DROP COLUMN "nome";

-- AlterTable
ALTER TABLE "public"."pacientes" DROP COLUMN "usuario_id",
ALTER COLUMN "sus" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."triagens" DROP COLUMN "data",
DROP COLUMN "paciente_id",
DROP COLUMN "prioridade",
ADD COLUMN     "cadastro_id" TEXT NOT NULL,
ADD COLUMN     "data_fim" TIMESTAMP(3),
ADD COLUMN     "data_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."usuarios" ADD COLUMN     "nome" VARCHAR(255) NOT NULL,
ALTER COLUMN "papel" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."cadastro_pacientes" (
    "id" TEXT NOT NULL,
    "prioridade" "public"."Prioridade" NOT NULL DEFAULT 'NAO_URGENTE',
    "paciente_id" TEXT NOT NULL,
    "status_triagem" "public"."StatusTriagem" NOT NULL DEFAULT 'AGUARDANDO',
    "status_atendimento" "public"."StatusAtendimento" NOT NULL DEFAULT 'AGUARDANDO',

    CONSTRAINT "cadastro_pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "triagens_cadastro_id_key" ON "public"."triagens"("cadastro_id");

-- AddForeignKey
ALTER TABLE "public"."cadastro_pacientes" ADD CONSTRAINT "cadastro_pacientes_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "public"."pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."triagens" ADD CONSTRAINT "triagens_cadastro_id_fkey" FOREIGN KEY ("cadastro_id") REFERENCES "public"."cadastro_pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
