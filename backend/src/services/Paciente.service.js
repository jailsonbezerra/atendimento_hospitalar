import pacienteModel from '../models/Paciente.model.js'


class PacienteService {
    async create(data) {
        data.data_nascimento = new Date(data.data_nascimento)
        data.sexo = data.sexo.toUpperCase()

        return await pacienteModel.create(data)
    }

    async findAll() {
        return await pacienteModel.findAll()
    }

    async findById(id) {
        const paciente = await pacienteModel.findById(id)

        if (!paciente) throw new Error('Paciente não encontrado')
            
        return paciente
    }

    async findBySus(sus) {
        const paciente = await pacienteModel.findBySus(sus)

        if (!paciente) throw new Error('Paciente não encontrado')

        return paciente
    }

    async update(id, data) {
        await this.findById(id)
        
        if (data.data_nascimento) data.data_nascimento = new Date(data.data_nascimento)

        if (data.sexo) data.sexo = data.sexo.toUpperCase()

        return await pacienteModel.update(id, data)
    }

    async delete(id) {
        await this.findById(id)

        return await pacienteModel.delete(id)
    }
}

export default new PacienteService()