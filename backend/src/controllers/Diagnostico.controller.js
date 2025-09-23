import diagnosticoService from '../services/Diagnostico.service.js'


class DiagnosticoController {
    async create(req, res) {
        try {
            const diagnostico = await diagnosticoService.create(req.body)

            return res.status(201).json(diagnostico)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findAll(req, res) {
        try {
            const diagnosticos = await diagnosticoService.findAll()

            return res.status(200).json(diagnosticos)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findById(req, res) {
        try {
            const diagnostico = await diagnosticoService.findById(req.params.id)

            return res.status(200).json(diagnostico)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        try {
            const diagnostico = await diagnosticoService.update(req.params.id, req.body)

            return res.status(200).json(diagnostico)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async delete(req, res) {
        try {
            await diagnosticoService.delete(req.params.id)
            
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

export default new DiagnosticoController()