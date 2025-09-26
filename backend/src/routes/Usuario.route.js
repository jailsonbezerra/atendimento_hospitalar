import express from 'express'

import usuarioController from '../controllers/Usuario.controller.js'

import { autenticarAdmin, getUserToken } from '../middlewares/autenticarUsuario.js'


class UsuarioRoute {
    constructor() {
        this.route = express.Router()
        this.routes()
    }

    routes() {
        this.route.get('/me', getUserToken, usuarioController.me)
        this.route.post('/login', usuarioController.login)
        // this.route.post('/create', usuarioController.create)
        this.route.post('/create', autenticarAdmin, usuarioController.create)
        this.route.get('/', usuarioController.findAll)
        this.route.get('/email/:email', usuarioController.findByEmail)
        this.route.get('/:id', autenticarAdmin, usuarioController.findById)
        this.route.put('/:id', autenticarAdmin, usuarioController.update)
        this.route.delete('/:id', autenticarAdmin, usuarioController.delete)
    }
}

export default new UsuarioRoute().route