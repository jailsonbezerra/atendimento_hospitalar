import cadastroPacienteModel from '../models/CadastroPaciente.model.js'


class CadastroPacienteService {
    async create(data) {
        if (data.prioridade) data.prioridade = data.prioridade.toUpperCase()
        if (data.status_triagem) data.status_triagem = data.status_triagem.toUpperCase()
        if (data.status_atendimento) data.status_atendimento = data.status_atendimento.toUpperCase()
            
        return cadastroPacienteModel.create(data)
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