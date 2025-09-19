import { prisma } from './prisma.js'


class TriagemModel {
    async create(data) {
        return await prisma.triagem.create({ data })
    }

    async findAll() {
        return await prisma.triagem.findMany()
    }

    async findById(id) {
        return await prisma.triagem.findUnique({ where: { id } })
    }

    async update(id, data) {
        return await prisma.triagem.update({ where: { id }, data })
    }

    async delete(id) {
        return await prisma.triagem.delete({ where: { id } }) 
    }
}

export default new TriagemModel()