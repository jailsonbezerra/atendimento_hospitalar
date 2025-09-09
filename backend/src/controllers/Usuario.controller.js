import usuarioService from '../services/Usuario.service.js'


class UsuarioController {
    async create(req, res) {
        const { email, senha, papel, sus, nome, data_nascimento, sexo } = req.body

        try {
            const paciente = await usuarioService.create({ email, senha, papel, sus, nome, data_nascimento, sexo })

            return res.status(201).json(paciente)
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
            const pacientes = await usuarioService.findAll()

            return res.status(200).json(pacientes)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findById(req, res) {
        const { id } = req.params

        try {
            const paciente = await usuarioService.findById(id)

            return res.status(200).json(paciente)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findBySus(req, res) {
        const { sus } = req.params

        try {
            const paciente = await usuarioService.findBySus(sus)

            return res.status(200).json(paciente)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { email, senha, sus, nome, data_nascimento, sexo } = req.body

        try {
            const paciente = await usuarioService.update(id, { email, senha, sus, nome, data_nascimento, sexo })

            return res.status(200).json(paciente)
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