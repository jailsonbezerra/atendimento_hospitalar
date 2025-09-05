import bcrypt from 'bcrypt'

import usuarioModel from '../models/Usuario.model.js'


class UsuarioService {
    async create(data) {
        const hashSenha = await bcrypt.hash(data.senha, 10)
        data.papel = data.papel.toUpperCase()
        data.data_nascimento = new Date(data.data_nascimento)
        data.sexo = data.sexo.toUpperCase()

        console.log(data)

        await usuarioModel.create({
            ...data,
            hash_senha: hashSenha,
            papel: data.papel.toUpperCase()
        })
    }

    async findAll() {
        return await usuarioModel.findAll()
    }

    async findById(id) {
        return await usuarioModel.findById(id)
    }

    async findBySus(sus) {
        return await usuarioModel.findBySus(sus)
    }

    async update(id, data) {
        const hashSenha = await bcrypt.hash(data.senha, 10)

        const paciente = {
            email,
            hash_senha: hashSenha,
            sus,
            nome,
            data_nascimento,
            sexo
        }

        return await usuarioModel.update(id, { data: paciente })
    }

    async delete(id) {
        return await usuarioModel.delete(id)
    }
}

export default new UsuarioService()