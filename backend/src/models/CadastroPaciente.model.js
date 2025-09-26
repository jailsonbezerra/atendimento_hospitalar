import { prisma } from './prisma.js'


class CadastroPacienteModel {
    async create(data) {
        const { paciente_id, prioridade } = data
        
        return prisma.cadastroPaciente.create({
            data:{
                prioridade,
                paciente: { connect: { id: paciente_id } }
            }
        })
    }

    async findAll() {
        return prisma.cadastroPaciente.findMany({
            include: { paciente: true },
        })
    }

    async findById(id) {
        return prisma.cadastroPaciente.findUnique({
            where: { id },
        })
    }

    async update(id, data) {
        return prisma.cadastroPaciente.update({
            where: { id },
            data,
        })
    }

    async delete(id) {
        return prisma.cadastroPaciente.delete({
            where: { id },
        })
    }
}

export default new CadastroPacienteModel()