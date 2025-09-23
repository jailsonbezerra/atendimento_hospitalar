import medicacaoService from '../services/Medicacao.service.js'

class MedicacaoController {
    async create(req, res) {
        try {
            const medicacao = await medicacaoService.create(req.body)

            return res.status(201).json(medicacao)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findAll(req, res) {
        try {
            const medicacoes = await medicacaoService.findAll()

            return res.status(200).json(medicacoes)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findById(req, res) {
        try {
            const medicacao = await medicacaoService.findById(req.params.id)

            return res.status(200).json(medicacao)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        try {
            const medicacao = await medicacaoService.update(req.params.id, req.body)

            return res.status(200).json(medicacao)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async delete(req, res) {
        try {
            await medicacaoService.delete(req.params.id)
            
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

export default new MedicacaoController()