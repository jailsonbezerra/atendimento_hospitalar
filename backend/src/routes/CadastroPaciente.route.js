import express from 'express'

import cadastroPacienteController from '../controllers/CadastroPaciente.controller.js'


class CadastroPacienteRoute {
    constructor() {
        this.router = express.Router()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/', cadastroPacienteController.create)
        this.router.get('/', cadastroPacienteController.findAll)
        this.router.get('/:id', cadastroPacienteController.findById)
        this.router.put('/:id', cadastroPacienteController.update)
        this.router.delete('/:id', cadastroPacienteController.delete)
    }
}

export default new CadastroPacienteRoute().router