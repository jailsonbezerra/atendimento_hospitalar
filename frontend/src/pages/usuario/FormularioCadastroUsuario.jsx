import { useState, useEffect } from 'react'

import usuarioService from '../../api/usuarioService'
import { notificacao } from '../../utils/notificacao'


export default function FormularioCadastroUsuario({ onBackToMenu }) {
    const [usuario, setUsuario] = useState({papel: 'admin'})

    useEffect(() => {
        setUsuario({papel: 'admin'})
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            // const emailExists = await usuarioService.getUsuarioByEmail(usuario.email)

            // if (emailExists) {
            //     notificacao('Email já cadastrado.', 'error')

            //     return
            // }

            await usuarioService.cadastrarUsuario(usuario)

            notificacao('Usuário cadastrado com sucesso!')
        } catch (error) {
            notificacao('Erro ao cadastrar usuário.', 'error')
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
                <label>Nome:</label>
                <input
                    type="text"
                    value={usuario.nome || ''}
                    onChange={(e) =>
                        setUsuario({ ...usuario, nome: e.target.value })
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

            <div className="form-group">
                <label>Papel:</label>
                <select
                    value={usuario.papel || ''}
                    onChange={(e) =>
                        setUsuario({ ...usuario, papel: e.target.value })
                    }
                    required
                >
                    <option value="admin">Admin</option>
                    <option value="medico">Médico</option>
                    <option value="atendente">Atendente</option>
                </select>
            </div>

            {
                usuario.papel === 'medico' && (
                <div className='form-group'>
                    <label>PRM</label>
                    <input
                        type="text"
                        value={usuario.prm || ''}
                        onChange={(e) =>
                            setUsuario({ ...usuario, prm: e.target.value })
                        }
                        required
                    />
                </div>
            )}

            {
                usuario.papel === 'atendente' && (
                <div className='form-group'>
                    <label>COREM</label>
                    <input
                        type="text"
                        value={usuario.corem || ''}
                        onChange={(e) =>
                            setUsuario({ ...usuario, corem: e.target.value })
                        }
                        required
                    />
                </div>
            )}
            <button type="submit">Cadastrar</button>
        </form>
    )
}