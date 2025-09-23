import pacienteService from '../services/Paciente.service.js'


class PacienteController {
    async create(req, res) {
        try {
            const paciente = await pacienteService.create(req.body)

            return res.status(201).json(paciente)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findAll(req, res) {
        try {
            const pacientes = await pacienteService.findAll()

            return res.status(200).json(pacientes)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findBySus(req, res) {
        const { sus } = req.params

        try {
            const paciente = await pacienteService.findBySus(sus)

            return res.status(200).json(paciente)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findByPrioridade(req, res) {
        const { triagem, atendimento } = req.query

        try {
            const pacientes = await pacienteService.findByPrioridade(triagem, atendimento)

            return res.status(200).json(pacientes)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findById(req, res) {
        const { id } = req.params

        try {
            const paciente = await pacienteService.findById(id)

            return res.status(200).json(paciente)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async update(req, res) {
        const { id } = req.params

        try {
            const paciente = await pacienteService.update(id, req.body)

            return res.status(200).json(paciente)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async updateStatus(req, res) {
        const { id } = req.params

        try {
            const paciente = await pacienteService.updateStatus(id, req.body)

            return res.status(200).json(paciente)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params

        try {
            await pacienteService.delete(id)

            return res.status(204).json()
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export default new PacienteController()