import triagemModel from '../models/Triagem.model.js'
import pacienteModel from '../models/Paciente.model.js'
import { prisma } from '../models/prisma.js'


class TriagemService {
    async create(data) {
        if (data.prioridade) data.prioridade = data.prioridade.toUpperCase()

            console.log(data)

        return await prisma.$transaction(async (tx) => {
            await pacienteModel.updateStatus(
                data.cadastro_id,
                { status_triagem: 'CONCLUIDA' },
                tx
            )

            return await triagemModel.create({
                peso: data.peso,
                altura: data.altura,
                temperatura: data.temperatura,
                pressao: data.pressao,
                data_inicio: data.data_inicio,
                data_fim: new Date(),
                cadastro_id: data.cadastro_id,
                atendente_id: data.atendente_id
            }, tx)
        })
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