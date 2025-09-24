import api from './api'


class UsuarioService {
    async cadastrarUsuario(usuario) {
        return await api.post('/usuarios/create', usuario)
    }

    async loginUsuario(credentials) {
        return await api.post('/usuarios/login', credentials)
    }

    async getAllUsuarios() {
        return await api.get('/usuarios')
    }

    async getUsuarioById(id) {
        return await api.get(`/usuarios/${id}`)
    }

    async getUsuarioByEmail(email) {
        return await api.get(`/usuarios/email/${email}`)
    }

    async updateUsuario(id, usuario) {
        return await api.put(`/usuarios/${id}`, usuario)
    }

    async deleteUsuario(id) {
        return await api.delete(`/usuarios/${id}`)
    }
}

export default new UsuarioService()