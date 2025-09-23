import medicacaoModel from '../models/Medicacao.model.js'


class MedicacaoService {
    async create(data) {
        return await medicacaoModel.create(data)
    }

    async findAll() {
        return await medicacaoModel.findAll()
    }

    async findById(id) {
        const medicacao = await medicacaoModel.findById(id)

        if (!medicacao) throw new Error('Medicacao nao encontrada')

        return medicacao
    }

    async update(id, data) {
        await this.findById(id)

        return await medicacaoModel.update(id, data)
    }

    async delete(id) {
        await this.findById(id)

        return await medicacaoModel.delete(id)
    }
}

export default new MedicacaoService()