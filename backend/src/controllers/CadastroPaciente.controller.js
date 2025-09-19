import cadastroPacienteService from '../services/CadastroPaciente.service.js'


class CadastroPacienteController {
    async create(req, res) {
        try {
            const cadastroPaciente = await cadastroPacienteService.create(req.body)

            return res.status(201).json(cadastroPaciente)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findAll(req, res) {
        try {
            const cadastrosPaciente = await cadastroPacienteService.findAll()

            return res.status(200).json(cadastrosPaciente)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params
            
            const cadastroPaciente = await cadastroPacienteService.findById(id)

            return res.status(200).json(cadastroPaciente)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params

            const cadastroPaciente = await cadastroPacienteService.update(id, req.body)

            return res.status(200).json(cadastroPaciente)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            await cadastroPacienteService.delete(id)

            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

export default new CadastroPacienteController()