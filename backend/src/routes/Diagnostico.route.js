import express from 'express'

import diagnosticoController from '../controllers/Diagnostico.controller.js'


class DiagnosticoRoute {
    constructor() {
        this.router = express.Router()
        this.routes()
    }

    routes() {
        this.router.post('/', diagnosticoController.create)
        this.router.get('/', diagnosticoController.findAll)
        this.router.get('/:id', diagnosticoController.findById)
        this.router.put('/:id', diagnosticoController.update)
        this.router.delete('/:id', diagnosticoController.delete)
    }
}

export default new DiagnosticoRoute().router