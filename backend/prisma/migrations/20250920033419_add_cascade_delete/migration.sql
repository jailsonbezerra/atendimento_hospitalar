-- DropForeignKey
ALTER TABLE "public"."atendentes" DROP CONSTRAINT "atendentes_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."atendimentos" DROP CONSTRAINT "atendimentos_medico_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."atendimentos" DROP CONSTRAINT "atendimentos_paciente_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."atendimentos" DROP CONSTRAINT "atendimentos_triagem_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."cadastro_pacientes" DROP CONSTRAINT "cadastro_pacientes_paciente_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."diagnosticos" DROP CONSTRAINT "diagnosticos_atendimento_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."medicacoes" DROP CONSTRAINT "medicacoes_atendimento_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."medicos" DROP CONSTRAINT "medicos_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."triagens" DROP CONSTRAINT "triagens_atendente_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."triagens" DROP CONSTRAINT "triagens_cadastro_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."cadastro_pacientes" ADD CONSTRAINT "cadastro_pacientes_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "public"."pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."medicos" ADD CONSTRAINT "medicos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendentes" ADD CONSTRAINT "atendentes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."triagens" ADD CONSTRAINT "triagens_cadastro_id_fkey" FOREIGN KEY ("cadastro_id") REFERENCES "public"."cadastro_pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."triagens" ADD CONSTRAINT "triagens_atendente_id_fkey" FOREIGN KEY ("atendente_id") REFERENCES "public"."atendentes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_triagem_id_fkey" FOREIGN KEY ("triagem_id") REFERENCES "public"."triagens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "public"."medicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "public"."pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."diagnosticos" ADD CONSTRAINT "diagnosticos_atendimento_id_fkey" FOREIGN KEY ("atendimento_id") REFERENCES "public"."atendimentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."medicacoes" ADD CONSTRAINT "medicacoes_atendimento_id_fkey" FOREIGN KEY ("atendimento_id") REFERENCES "public"."atendimentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
