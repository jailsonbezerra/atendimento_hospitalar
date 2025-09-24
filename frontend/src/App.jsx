import React, { useState } from 'react'

import './App.css'

import Home from './pages/home/Home'
import Cadastro from './components/Cadastro'
import Triagem from './components/Triagem'
import Atendimento from './components/Atendimento'
import Display from './components/Display'
import CadastroUsuario from './pages/usuario/CadastroLoginUsuario'


function App() {
    const [currentPage, setCurrentPage] = useState('home')

    const navigateTo = (pageName) => {
        setCurrentPage(pageName)
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home onNavigate={navigateTo} />
            case 'cadastro':
                return <Cadastro onBackToMenu={() => navigateTo('home')} />
            case 'triagem':
                return <Triagem onBackToMenu={() => navigateTo('home')} />
            case 'atendimento':
                return <Atendimento onBackToMenu={() => navigateTo('home')} />
            case 'display':
                return <Display onBackToMenu={() => navigateTo('home')} />
            case 'usuario':
                return <CadastroUsuario onBackToMenu={() => navigateTo('home')} />
            default:
                return <p>Página não encontrada!</p>
        }
    }

    return (
        <main className="App">
            {renderPage()}
        </main>
    )
}

export default App