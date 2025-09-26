import api from './api'


class TriagemService {
    async getAllTriagens() {
        return await api.get('/triagens')
    }
    async createTriagem(triagem) {
        return await api.post('/triagens', triagem)
    }
    async deleteTriagem(id) {
        return await api.delete(`/triagens/${id}`)
    }
    async getTriagemById(id) {
        return await api.get(`/triagens/${id}`)
    }
    async updateTriagem(id, triagem) {
        return await api.put(`/triagens/${id}`, triagem)
    }
}

export default new TriagemService()