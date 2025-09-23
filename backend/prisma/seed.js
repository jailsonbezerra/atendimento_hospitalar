// prisma/seed.js

import { fa } from '@faker-js/faker';
import { PrismaClient } from '../generated/prisma/client.js';
import { faker } from '@faker-js/faker/locale/pt_BR';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');

  // Limpa o banco de dados antes de popular para evitar duplicatas
  await prisma.medicacao.deleteMany();
  await prisma.diagnostico.deleteMany();
  await prisma.atendimento.deleteMany();
  await prisma.triagem.deleteMany();
  await prisma.cadastroPaciente.deleteMany();
  await prisma.medico.deleteMany();
  await prisma.atendente.deleteMany();
  await prisma.paciente.deleteMany();
  await prisma.usuario.deleteMany();

  // 1. Criar usuários, médicos e atendentes
  
  // Usuário Admin
  await prisma.usuario.create({
    data: {
      email: 'admin@hospital.com',
      nome: 'Admin do Sistema',
      hash_senha: faker.string.uuid(),
      papel: 'ADMIN',
    },
  });
  
  // Usuários Atendentes
  const atendentePromises = Array.from({ length: 2 }).map(() => {
    return prisma.usuario.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        nome: faker.person.fullName(),
        hash_senha: faker.string.uuid(),
        papel: 'ATENDENTE',
        atendente: {
          create: {
            corem: faker.string.alphanumeric(10),
          },
        },
      },
      include: {
        atendente: true,
      },
    });
  });
  const atendentes = await Promise.all(atendentePromises);
  const atendente1 = atendentes[0].atendente;

  // Usuários Médicos
  const medicoPromises = Array.from({ length: 3 }).map(() => {
    return prisma.usuario.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        nome: faker.person.fullName(),
        hash_senha: faker.string.uuid(),
        papel: 'MEDICO',
        medico: {
          create: {
            prm: faker.string.alphanumeric(10),
          },
        },
      },
      include: {
        medico: true,
      },
    });
  });
  const medicos = await Promise.all(medicoPromises);

  // 2. Criar Pacientes
  const pacientesPromises = Array.from({ length: 15 }).map(() => {
    const sexo = faker.helpers.arrayElement(['MASCULINO', 'FEMININO']);
    return prisma.paciente.create({
      data: {
        sus: faker.string.numeric(15),
        nome: faker.person.fullName({ sex: sexo === 'MASCULINO' ? 'male' : 'female' }),
        data_nascimento: faker.date.birthdate(),
        sexo: sexo,
      },
    });
  });
  const pacientes = await Promise.all(pacientesPromises);

  // 3. Criar Registros de Cadastro e Triagem (de 1 a 5 por paciente)
  const allCadastros = [];
  
  for (const paciente of pacientes) {
    const numCadastros = faker.number.int({ min: 1, max: 5 });
    
    for (let i = 0; i < numCadastros; i++) {
      const cadastro = await prisma.cadastroPaciente.create({
        data: {
          prioridade: faker.helpers.arrayElement(['NAO_URGENTE', 'POUCO_URGENTE', 'URGENTE', 'MUITO_URGENTE', 'EMERGENCIA']),
          paciente_id: paciente.id,
          status_triagem: faker.helpers.arrayElement(['AGUARDANDO', 'EM_ANDAMENTO', 'CONCLUIDA']),
          status_atendimento: faker.helpers.arrayElement(['AGUARDANDO', 'EM_ANDAMENTO', 'CONCLUIDO']),
          triagem: {
            create: {
              peso: faker.number.float({ min: 50, max: 120, precision: 0.01 }),
              altura: faker.number.float({ min: 1.5, max: 2.0, precision: 0.01 }),
              temperatura: faker.number.int({ min: 35, max: 40 }),
              pressao: `${faker.number.int({ min: 100, max: 140 })}/${faker.number.int({ min: 60, max: 90 })}`,
              atendente_id: atendente1.id,
              data_inicio: faker.date.recent(),
              data_fim: faker.date.recent(),
            },
          },
        },
        include: { triagem: true },
      });
      allCadastros.push(cadastro);
    }
  }

  // 4. Criar Atendimentos para cada triagem concluída
  const atendimentosPromises = allCadastros.map(async (cadastro) => {
    const medicoAleatorio = faker.helpers.arrayElement(medicos).medico;
    
    return prisma.atendimento.create({
      data: {
        paciente_id: cadastro.paciente_id,
        medico_id: medicoAleatorio.id,
        triagem_id: cadastro.triagem.id,
        data_inicio: cadastro.triagem.data_fim,
        data_fim: faker.date.recent(),
        diagnostico: {
          create: [
            { diagnostico: faker.lorem.sentence() },
            { diagnostico: faker.lorem.sentence() },
          ],
        },
        medicacao: {
          create: [
            { medicacao: faker.lorem.words(3) },
            { medicacao: faker.lorem.words(3) },
          ],
        },
      },
    });
  });

  await Promise.all(atendimentosPromises);

  console.log('Seeding concluído com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });