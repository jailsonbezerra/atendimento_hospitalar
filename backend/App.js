import express from 'express'
import cors from 'cors'

import UsuarioRoute from './src/routes/Usuario.route.js'


class App {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    routes() {
        this.app.use('/api', UsuarioRoute)
    }
}

export default new App().app