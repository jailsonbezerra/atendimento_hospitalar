import { prisma } from './prisma.js'


class DiagnosticoModel {
    async create(data) {
        return await prisma.diagnostico.create({ data })
    }

    async findAll() {
        return await prisma.diagnostico.findMany()
    }

    async findById(id) {
        return await prisma.diagnostico.findUnique({ where: { id } })
    }

    async update(id, data) {
        return await prisma.diagnostico.update({ where: { id }, data })
    }

    async delete(id) {
        return await prisma.diagnostico.delete({ where: { id } }) 
    }
}

export default new DiagnosticoModel()