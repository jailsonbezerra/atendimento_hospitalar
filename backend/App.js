import express from 'express'
import cors from 'cors'

import UsuarioRoute from './src/routes/Usuario.route.js'
import PacienteRoute from './src/routes/Paciente.route.js'
import CadastroPacienteRoute from './src/routes/CadastroPaciente.route.js'
import TriagemRoute from './src/routes/Triagem.route.js'
import AtendimentoRoute from './src/routes/Atendimento.route.js'
import MedicacaoRoute from './src/routes/Medicacao.route.js'
import DiagnosticoRoute from './src/routes/Diagnostico.route.js'


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
        this.app.use('/api/cadastros-pacientes', CadastroPacienteRoute)
        this.app.use('/api/triagens', TriagemRoute)
        this.app.use('/api/atendimentos', AtendimentoRoute)
        this.app.use('/api/medicacoes', MedicacaoRoute)
        this.app.use('/api/diagnosticos', DiagnosticoRoute)
    }
}

export default new App().app