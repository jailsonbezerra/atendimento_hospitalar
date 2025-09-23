import atendimentoService from '../services/Atendimento.service.js'


class AtendimentoController {
    async create(req, res) {
        try {
            const atendimento = await atendimentoService.create(req.body)

            return res.status(201).json(atendimento)
        } catch (e) {
            return res.status(400).json({ error: e.message })
        }
    }

    async findAll(req, res) {
        try {
            const atendimentos = await atendimentoService.findAll()

            return res.status(200).json(atendimentos)
        } catch (e) {
            return res.status(400).json({ error: e.message })
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params
            
            const atendimento = await atendimentoService.findById(id)

            return res.status(200).json(atendimento)
        } catch (e) {
            return res.status(400).json({ error: e.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params

            const atendimento = await atendimentoService.update(id, req.body)

            return res.status(200).json(atendimento)
        } catch (e) {
            return res.status(400).json({ error: e.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            await atendimentoService.delete(id)

            return res.status(204).send()
        } catch (e) {
            return res.status(400).json({ error: e.message })
        }
    }
}

export default new AtendimentoController()