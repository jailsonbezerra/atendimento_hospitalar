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

    async update(id, data) {
        return await prisma.paciente.update({ where: { id }, data })
    }

    async delete(id) {
        return await prisma.paciente.delete({ where: { id } })
    }
}

export default new pacienteModel()