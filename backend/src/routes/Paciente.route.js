import express from 'express'

import pacienteController from '../controllers/Paciente.controller.js'


class PacienteRoute {
    constructor() {
        this.route = express.Router()
        this.routes()
    }

    routes() {
        this.route.post('/', pacienteController.create)
        this.route.get('/', pacienteController.findAll)
        this.route.get('/fila', pacienteController.findByPrioridade)
        this.route.get('/:id', pacienteController.findById)
        this.route.put('/:id', pacienteController.update)
        this.route.patch('/:id/status', pacienteController.updateStatus)
        this.route.delete('/:id', pacienteController.delete)
        this.route.get('/sus/:sus', pacienteController.findBySus)
    }
}

export default new PacienteRoute().route