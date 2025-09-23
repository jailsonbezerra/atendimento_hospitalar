import { prisma } from './prisma.js'


class MedicacaoModel {
    async create(data) {
        return await prisma.medicacao.create({ data })
    }

    async findAll() {
        return await prisma.medicacao.findMany()
    }

    async findById(id) {
        return await prisma.medicacao.findUnique({ where: { id } })
    }

    async update(id, data) {
        return await prisma.medicacao.update({ where: { id }, data })
    }

    async delete(id) {
        return await prisma.medicacao.delete({ where: { id } }) 
    }
}

export default new MedicacaoModel()