import express from 'express'

import usuarioController from '../controllers/Usuario.controller.js'

import { autenticarAdmin } from '../middlewares/autenticarUsuario.js'


class UsuarioRoute {
    constructor() {
        this.app = express.Router()
        this.routes()
    }

    routes() {
        this.app.post('/login', usuarioController.login)
        this.app.post('/create', usuarioController.create)
        this.app.get('/usuarios/:id', autenticarAdmin, usuarioController.findById)
        this.app.put('/usuarios/:id', autenticarAdmin, usuarioController.update)
        this.app.delete('/usuarios/:id', autenticarAdmin, usuarioController.delete)
    }
}

export default new UsuarioRoute().app