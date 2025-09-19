import bcrypt from 'bcrypt'
import awt from 'jsonwebtoken'

import 'dotenv/config'

import usuarioModel from '../models/Usuario.model.js'


class UsuarioService {
    async create(data) {
        const hashSenha = await bcrypt.hash(data.senha, 10)

        if (data.papel) data.papel = data.papel.toUpperCase()

        return await usuarioModel.create({
            ...data,
            hash_senha: hashSenha
        })
    }

    async login(email, senha) {
        const usuario = await usuarioModel.findByEmail(email)

        if (!usuario) throw new Error('Email ou senha inválidos')

        const senhaValida = await bcrypt.compare(senha, usuario.hash_senha)

        if (!senhaValida) throw new Error('Email ou senha inválidos')

        const token = awt.sign({ id: usuario.id, email: usuario.email, papel: usuario.papel }, process.env.JWT_SECRET, { expiresIn: '1d' })

        return { mensagem: 'Login realizado com sucesso', token }
    }

    async findAll() {
        return await usuarioModel.findAll()
    }

    async findById(id) {
        const usuario = await usuarioModel.findById(id)

        if (!usuario) throw new Error('Usuário não encontrado')

        return usuario
    }

    async findByEmail(email) {
        const usuario = await usuarioModel.findByEmail(email)

        if (!usuario) throw new Error('Usuário não encontrado')

        return usuario
    }

    async update(id, data) {
        let hashSenha = null

        await this.findById(id)
        
        if (data.data_nascimento) data.data_nascimento = new Date(data.data_nascimento)
        if (data.sexo) data.sexo = data.sexo.toUpperCase()
        if (data.papel) data.papel = data.papel.toUpperCase()
                    
        if (data.senha) {
            hashSenha = await bcrypt.hash(data.senha, 10)

            return await usuarioModel.update(id, { ...data, hash_senha: hashSenha })
        }

        return await usuarioModel.update(id, { data })
    }

    async delete(id) {
        await this.findById(id)

        return await usuarioModel.delete(id)
    }
}

export default new UsuarioService()