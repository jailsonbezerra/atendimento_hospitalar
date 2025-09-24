import { prisma } from './prisma.js'


class TriagemModel {
    async create(data) {
        return await prisma.$transaction(async (tx) => {
            const cadastroUpdate = {
                status_triagem: 'CONCLUIDA'
            }

            if (data.prioridade) cadastroUpdate.prioridade = data.prioridade

            const cadastroPaciente = await tx.cadastroPaciente.update({ 
                where: { id: data.cadastro_id },
                data: { 
                    ...cadastroUpdate
                } 
            })

            if (!cadastroPaciente) throw new Error('Cadastro não encontrado')

            const triagem = await tx.triagem.create({
                data: {
                    peso: data.peso,
                    altura: data.altura,
                    temperatura: data.temperatura,
                    pressao: data.pressao,
                    cadastro_id: cadastroPaciente.id,
                    atendente_id: data.atendente_id
                }
            })

            return triagem
        })
    }

    async findAll() {
        return await prisma.triagem.findMany({
            select: {
                peso: true,
                altura: true,
                temperatura: true,
                pressao: true,
                cadastro: true,
                atendente: true
            }
        })
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