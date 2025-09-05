import 'dotenv/config.js'

import app from './App.js'


const porta = process.env.PORT || 3000

app.listen(porta, () => {
    console.log(`Servidor rodando link http://localhost:${porta}`)
})