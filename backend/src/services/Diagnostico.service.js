import diagnosticoModel from '../models/diagnostico.model.js'


class DiagnosticoService {
    async create(data) {
        return await diagnosticoModel.create(data)
    }

    async findAll() {
        return await diagnosticoModel.findAll()
    }

    async findById(id) {
        const diagnostico = await diagnosticoModel.findById(id)

        if (!diagnostico) throw new Error('Diagnostico nao encontrado')

        return diagnostico
    }

    async update(id, data) {
        await this.findById(id)

        return await diagnosticoModel.update(id, data)
    }

    async delete(id) {
        await this.findById(id)

        return await diagnosticoModel.delete(id)
    }
}

export default new DiagnosticoService()