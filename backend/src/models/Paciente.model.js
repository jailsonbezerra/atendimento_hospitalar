import { prisma } from './prisma.js'


class pacienteModel {
    async create(data) {
        return await prisma.paciente.create({ data })
    }

    async findAll() {
        return await prisma.paciente.findMany()
    }

    async findById(id) {
        return await prisma.paciente.findUnique({ where: { id } })
    }

    async findBySus(sus) {
        return await prisma.paciente.findUnique({ where: { sus } })
    }

    async findByPrioridade(triagem, atendimento) {
        return await prisma.cadastroPaciente.findMany({
            where: { status_atendimento: atendimento, status_triagem: triagem },
            include: { paciente: true },
            orderBy: [
                { prioridade: 'desc' },
                { id: 'asc' }
            ]
        })
    }

    async update(id, data) {
        return await prisma.paciente.update({ where: { id }, data })
    }

    async updateStatus(id, status) {
        const statusUpdate = {}
        
        if (status.status_triagem) statusUpdate.status_triagem = status.status_triagem
        
        if (status.status_atendimento) statusUpdate.status_atendimento = status.status_atendimento

        return await prisma.cadastroPaciente.update({
            where: { id },
            data: { ...statusUpdate },
            include: { paciente: true }
        })
    }

    async delete(id) {
        return await prisma.paciente.delete({ where: { id } })
    }
}

export default new pacienteModel()