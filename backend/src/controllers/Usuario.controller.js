import usuarioService from '../services/Usuario.service.js'


class UsuarioController {
    async create(req, res) {
        try {
            const usuario = await usuarioService.create(req.body)

            return res.status(201).json(usuario)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async login(req, res) {
        const { email, senha } = req.body

        try {
            const { mensagem, token } = await usuarioService.login(email, senha)

            return res.status(200).json({ mensagem, token })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findAll(req, res) {
        try {
            const usuarios = await usuarioService.findAll()

            return res.status(200).json(usuarios)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findById(req, res) {
        const { id } = req.params

        try {
            const usuario = await usuarioService.findById(id)

            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findByEmail(req, res) {
        const { email } = req.params

        try {
            const usuario = await usuarioService.findByEmail(email)

            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async update(req, res) {
        const { id } = req.params

        try {
            const usuario = await usuarioService.update(id, req.body)

            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params

        try {
            await usuarioService.delete(id)

            return res.status(204).json()
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export default new UsuarioController()