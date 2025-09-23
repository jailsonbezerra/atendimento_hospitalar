import atendimentoModel from '../models/Atendimento.model.js'


class AtendimentoService {
    async create(data) {
        return await atendimentoModel.create(data)
    }

    async findAll() {
        return await atendimentoModel.findAll()
    }

    async findById(id) {
        const atendimento = await atendimentoModel.findById(id)

        if (!atendimento) throw new Error('Atendimento nao encontrado')

        return atendimento
    }

    async update(id, data) {
        await this.findById(id)

        return await atendimentoModel.update(id, data)
    }

    async delete(id) {
        await this.findById(id)

        return await atendimentoModel.delete(id)
    }
}

export default new AtendimentoService()