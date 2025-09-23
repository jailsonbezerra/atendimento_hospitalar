import express from 'express'

import atendimentoController from '../controllers/Atendimento.controller.js'


class AtendimentoRoute {
    constructor() {
        this.router = express.Router()
        this.routes()
    }

    routes() {
        this.router.post('/', atendimentoController.create)
        this.router.get('/', atendimentoController.findAll)
        this.router.get('/:id', atendimentoController.findById)
        this.router.put('/:id', atendimentoController.update)
        this.router.delete('/:id', atendimentoController.delete)
    }
}

export default new AtendimentoRoute().router