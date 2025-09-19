import express from 'express'

import triagemController from '../controllers/Triagem.controller.js'


class TriagemRoute {
    constructor() {
        this.router = express.Router()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/', triagemController.create)
        this.router.get('/', triagemController.findAll)
        this.router.get('/:id', triagemController.findById)
        this.router.put('/:id', triagemController.update)
        this.router.delete('/:id', triagemController.delete)
    }
}

export default new TriagemRoute().router