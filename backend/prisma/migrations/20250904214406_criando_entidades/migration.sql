-- CreateEnum
CREATE TYPE "public"."Papel" AS ENUM ('PACIENTE', 'ATENDENTE', 'MEDICO', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."Sexo" AS ENUM ('MASCULINO', 'FEMININO');

-- CreateEnum
CREATE TYPE "public"."Prioridade" AS ENUM ('NAO_URGENTE', 'POUCO_URGENTE', 'URGENTE', 'MUITO_URGENTE', 'EMERGENCIA');

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hash_senha" TEXT NOT NULL,
    "papel" "public"."Papel" NOT NULL DEFAULT 'PACIENTE',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pacientes" (
    "id" TEXT NOT NULL,
    "sus" TEXT,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" "public"."Sexo" NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."medicos" (
    "id" TEXT NOT NULL,
    "prm" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."atendentes" (
    "id" TEXT NOT NULL,
    "corem" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "atendentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."triagens" (
    "id" TEXT NOT NULL,
    "peso" DECIMAL(8,2) NOT NULL,
    "altura" DECIMAL(8,2) NOT NULL,
    "temperatura" INTEGER NOT NULL,
    "pressao" TEXT NOT NULL,
    "paciente_id" TEXT NOT NULL,
    "atendente_id" TEXT NOT NULL,
    "prioridade" "public"."Prioridade" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "triagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."atendimentos" (
    "id" TEXT NOT NULL,
    "triagem_id" TEXT,
    "medico_id" TEXT NOT NULL,
    "paciente_id" TEXT NOT NULL,

    CONSTRAINT "atendimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."diagnosticos" (
    "id" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "atendimento_id" TEXT NOT NULL,

    CONSTRAINT "diagnosticos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."medicacoes" (
    "id" TEXT NOT NULL,
    "medicacao" TEXT NOT NULL,
    "atendimento_id" TEXT NOT NULL,

    CONSTRAINT "medicacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_sus_key" ON "public"."pacientes"("sus");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_usuario_id_key" ON "public"."pacientes"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_prm_key" ON "public"."medicos"("prm");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_usuario_id_key" ON "public"."medicos"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "atendentes_corem_key" ON "public"."atendentes"("corem");

-- CreateIndex
CREATE UNIQUE INDEX "atendentes_usuario_id_key" ON "public"."atendentes"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "atendimentos_triagem_id_key" ON "public"."atendimentos"("triagem_id");

-- AddForeignKey
ALTER TABLE "public"."pacientes" ADD CONSTRAINT "pacientes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."medicos" ADD CONSTRAINT "medicos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendentes" ADD CONSTRAINT "atendentes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."triagens" ADD CONSTRAINT "triagens_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "public"."pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."triagens" ADD CONSTRAINT "triagens_atendente_id_fkey" FOREIGN KEY ("atendente_id") REFERENCES "public"."atendentes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_triagem_id_fkey" FOREIGN KEY ("triagem_id") REFERENCES "public"."triagens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "public"."medicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "public"."pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."diagnosticos" ADD CONSTRAINT "diagnosticos_atendimento_id_fkey" FOREIGN KEY ("atendimento_id") REFERENCES "public"."atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."medicacoes" ADD CONSTRAINT "medicacoes_atendimento_id_fkey" FOREIGN KEY ("atendimento_id") REFERENCES "public"."atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
