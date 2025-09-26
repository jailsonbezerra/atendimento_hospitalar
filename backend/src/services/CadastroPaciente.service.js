import cadastroPacienteModel from '../models/CadastroPaciente.model.js'
import pacienteModel from '../models/Paciente.model.js'
import { prisma } from '../models/prisma.js'


class CadastroPacienteService {
    async create(data) {
        if (data.prioridade) data.prioridade = data.prioridade.toUpperCase()
        if (data.status_triagem) data.status_triagem = data.status_triagem.toUpperCase()
        if (data.status_atendimento) data.status_atendimento = data.status_atendimento.toUpperCase()
        if (data.data_nascimento) data.data_nascimento = new Date(data.data_nascimento)

        // console.log(data)
            
        return prisma.$transaction(async (tx) => {
            let pacienteId = data.paciente_id

            if (!pacienteId) {
                const novoPaciente = await pacienteModel.create({
                    sus: data.sus,
                	nome: data.nome,
                	data_nascimento: data.data_nascimento,
                	sexo: data.sexo
                }, tx)

                pacienteId = novoPaciente.id
            }

            return await cadastroPacienteModel.create({
                paciente_id: pacienteId,
                prioridade: data.prioridade
            }, tx)

        })
    }

    async findAll() {
        return cadastroPacienteModel.findAll()
    }

    async findById(id) {
        const cadastroPaciente = await cadastroPacienteModel.findById(id)

        if (!cadastroPaciente) throw new Error('Cadastro de paciente não encontrado')

        return cadastroPaciente
    }

    async update(id, data) {
        await this.findById(id)

        if (data.prioridade) data.prioridade = data.prioridade.toUpperCase()
        if (data.status_triagem) data.status_triagem = data.status_triagem.toUpperCase()
        if (data.status_atendimento) data.status_atendimento = data.status_atendimento.toUpperCase()

        return cadastroPacienteModel.update(id, data)
    }

    async delete(id) {
        await this.findById(id)

        return cadastroPacienteModel.delete(id)
    }
}

export default new CadastroPacienteService()