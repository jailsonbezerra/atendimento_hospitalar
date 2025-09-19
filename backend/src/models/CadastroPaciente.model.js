import { prisma } from './prisma.js'


class CadastroPacienteModel {
    async create(data) {
        return prisma.cadastroPaciente.create({
            data,
        })
    }

    async findAll() {
        return prisma.cadastroPaciente.findMany()
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