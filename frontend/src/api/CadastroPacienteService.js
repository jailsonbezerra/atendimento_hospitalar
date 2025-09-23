import api from './api'


class CadastroPacienteService {
    async cadastrarPaciente(paciente) {
        return await api.post('/cadastros-pacientes', paciente)
    }

    async getAllCadastros() {
        return await api.get('/cadastros-pacientes')
    }

    async getCadastroById(id) {
        return await api.get(`/cadastros-pacientes/${id}`)
    }

    async updateCadastro(id, cadastro) {
        return await api.put(`/cadastros-pacientes/${id}`, cadastro)
    }

    async deleteCadastro(id) {
        return await api.delete(`/cadastros-pacientes/${id}`)
    }
}

export default new CadastroPacienteService()