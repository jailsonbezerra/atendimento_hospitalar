import express from 'express'
import cors from 'cors'

import UsuarioRoute from './src/routes/Usuario.route.js'
import PacienteRoute from './src/routes/Paciente.route.js'
import CadastroPacienteRoute from './src/routes/CadastroPaciente.route.js'
import TriagemRoute from './src/routes/Triagem.route.js'

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
        this.app.use('/api/usuarios', UsuarioRoute)
        this.app.use('/api/pacientes', PacienteRoute)
        this.app.use('/api/cadastro-pacientes', CadastroPacienteRoute)
        this.app.use('/api/triagens', TriagemRoute)
    }
}

export default new App().app