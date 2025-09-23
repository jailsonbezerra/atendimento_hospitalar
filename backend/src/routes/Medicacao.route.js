import express from 'express'

import medicacaoController from '../controllers/Medicacao.controller.js'


class MedicacaoRoute {
    constructor() {
        this.router = express.Router()
        this.routes()
    }

    routes() {
        this.router.post('/', medicacaoController.create)
        this.router.get('/', medicacaoController.findAll)
        this.router.get('/:id', medicacaoController.findById)
        this.router.put('/:id', medicacaoController.update)
        this.router.delete('/:id', medicacaoController.delete)
    }
}

export default new MedicacaoRoute().router