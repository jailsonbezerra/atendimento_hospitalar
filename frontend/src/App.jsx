import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import Nav from './components/Nav'
import Home from './pages/home/Home'
import CadastroPaciente from './pages/cadastroPaciente/CadastroPaciente'
import Triagem from './pages/triagem/Triagem'
import Atendimento from './components/Atendimento'
import Display from './components/Display'
import CadastroUsuario from './pages/usuario/CadastroLoginUsuario'

import usuarioService from './api/usuarioService'


function App() {
    const [currentPage, setCurrentPage] = useState('home')
    const [usuario, setUsuario] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        verificarToken(token)
    }, [])

    const navigateTo = (pageName) => {
        setCurrentPage(pageName)
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home onNavigate={navigateTo} usuario={usuario} />
            case 'cadastro':
                return <CadastroPaciente onBackToMenu={() => navigateTo('home')} />
            case 'triagem':
                return <Triagem onBackToMenu={() => navigateTo('home')} usuario={usuario} />
            case 'atendimento':
                return <Atendimento onBackToMenu={() => navigateTo('home')} />
            case 'display':
                return <Display onBackToMenu={() => navigateTo('home')} />
            case 'usuario':
                return <CadastroUsuario onBackToMenu={() => navigateTo('home')} onLoginSuccess={handleLoginSuccess} usuario={usuario} />
            default:
                return <p>Página não encontrada!</p>
        }
    }

    const verificarToken = (async (token) => {
        if (token) {
            setIsLoggedIn(true)

            const usuarioLogado = await usuarioService.getUsuarioLogado()

            setUsuario(usuarioLogado.data)
        }
    })

    const handleLoginSuccess = (token) => {
        localStorage.setItem('token', token);

        try {
            verificarToken(token)

            navigateTo('home')
        } catch (error) {
            console.error("O token recebido no login é inválido:", error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')

        setIsLoggedIn(false)

        setUsuario({})
    }

    return (
        <>
            <Nav
                onNavigate={navigateTo}
                isLoggedIn={isLoggedIn}
                usuario={usuario}
                onLogout={handleLogout}
            />

            <main className="App">
                {renderPage()}
                <ToastContainer autoClose={3000} theme="colored" hideProgressBar />
            </main>
        </>
    )
}

export default App