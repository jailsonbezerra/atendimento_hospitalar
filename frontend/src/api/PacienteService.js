import api from './api'


class PacienteService {
    async createPaciente(paciente) {
        return await api.post('/pacientes', paciente)
    }

    async getAllPacientes() {
        return await api.get('/pacientes')
    }

    async getPacienteById(id) {
        return await api.get(`/pacientes/${id}`)
    }

    async getPacienteBySus(sus) {
        return await api.get(`/pacientes/sus/${sus}`)
    }

    async getPacientesByPrioridade(triagem, atendimento) {
        return await api.get(`/pacientes/fila?triagem=${triagem}&atendimento=${atendimento}`)
    }

    async updatePaciente(id, paciente) {
        return await api.put(`/pacientes/${id}`, paciente)
    }

    async updateStatus(id, status) {
        return await api.patch(`/pacientes/${id}/status`, status)
    }

    async deletePaciente(id) {
        return await api.delete(`/pacientes/${id}`)
    }
}

export default new PacienteService()