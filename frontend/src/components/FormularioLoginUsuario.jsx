import { useState, useEffect } from 'react'

import usuarioService from '../api/usuarioService'
import { notificacao } from '../utils/notificacao'


export default function FormularioLoginUsuario({ onBackToMenu }) {
    const [usuario, setUsuario] = useState({email: '', senha: ''})
    const [token, setToken] = useState(null)

    useEffect(() => {
        const savedToken = localStorage.getItem('token')

        if (savedToken) setToken(savedToken)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await usuarioService.loginUsuario(usuario)

            setToken(response.data.token)

            localStorage.setItem('token', response.data.token)

            notificacao('Usuário logado com sucesso!')

            onBackToMenu()
        } catch (error) {
            notificacao(error, 'error')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={usuario.email || ''}
                    onChange={(e) =>
                        setUsuario({ ...usuario, email: e.target.value })
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Senha:</label>
                <input
                    type="password"
                    value={usuario.senha || ''}
                    onChange={(e) =>
                        setUsuario({ ...usuario, senha: e.target.value })
                    }
                    required
                />
            </div>

            <button type="submit">Logar</button>
        </form>
    )
}