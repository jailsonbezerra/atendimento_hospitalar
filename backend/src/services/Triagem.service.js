import triagemModel from '../models/Triagem.model.js'


class TriagemService {
    async create(data) {
        if (data.prioridade) data.prioridade = data.prioridade.toUpperCase()
        
        return await triagemModel.create(data)
    }

    async findAll() {
        return await triagemModel.findAll()
    }

    async findById(id) {
        const triagem = await triagemModel.findById(id)

        if (!triagem) throw new Error('Triagem nao encontrada')

        return triagem
    }

    async update(id, data) {
        await this.findById(id)

        return await triagemModel.update(id, data)
    }

    async delete(id) {
        await this.findById(id)

        return await triagemModel.delete(id)
    }
}

export default new TriagemService()