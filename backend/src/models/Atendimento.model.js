import { prisma } from './prisma.js'


class AtendimentoModel {
    async create(data) {
        return await prisma.atendimento.create({ data })
    }

    async findAll() {
        return await prisma.atendimento.findMany()
    }

    async historico() {
        const atendimentoPorMedico = await prisma.medico.findMany({
            select: {
                prm: true,
                usuario: { select: { nome: true } },
                _count: { select: { atendimento: true } }
            }
        })

        const pacientesPorPrioridade = await prisma.cadastroPaciente.groupBy({
            by: ['prioridade'],
            _count: { prioridade: true },
        })

        return { atendimentoPorMedico, pacientesPorPrioridade }
    }

    async findById(id) {
        return await prisma.atendimento.findUnique({ where: { id } })
    }

    async update(id, data) {
        return await prisma.atendimento.update({ where: { id }, data })
    }

    async findById(id) {
        return await prisma.atendimento.findUnique({ where: { id } })
    }

    async update(id, data) {
        return await prisma.atendimento.update({ where: { id }, data })
    }

    async delete(id) {
        return await prisma.atendimento.delete({ where: { id } }) 
    }
}

export default new AtendimentoModel()