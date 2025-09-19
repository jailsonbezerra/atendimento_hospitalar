import triagemService from '../services/Triagem.service.js'


class TriagemController {
    async create(req, res) {
        try {
            const triagem = await triagemService.create(req.body)

            return res.status(201).json(triagem)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findAll(req, res) {
        try {
            const triagem = await triagemService.findAll()

            return res.status(200).json(triagem)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findById(req, res) {
        const { id } = req.params

        try {
            const triagem = await triagemService.findById(id)

            return res.status(200).json(triagem)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async update(req, res) {
        const { id } = req.params

        try {
            const triagem = await triagemService.update(id, req.body)

            return res.status(200).json(triagem)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params

        try {
            await triagemService.delete(id)

            return res.status(204).send()
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export default new TriagemController()