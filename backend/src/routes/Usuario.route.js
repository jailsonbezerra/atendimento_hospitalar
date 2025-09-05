import express from 'express'

import usuarioController from '../controllers/Usuario.controller.js'


class UsuarioRoute {
    constructor() {
        this.app = express.Router()
        this.routes()
    }

    routes() {
        this.app.get('/pacientes', usuarioController.findAll)
        this.app.get('/pacientes/:id', usuarioController.findById)
        this.app.get('/pacientes/sus/:sus', usuarioController.findBySus)
        this.app.post('/pacientes', usuarioController.create)
        this.app.put('/pacientes/:id', usuarioController.update)
        this.app.delete('/pacientes/:id', usuarioController.delete)
    }
}

export default new UsuarioRoute().app