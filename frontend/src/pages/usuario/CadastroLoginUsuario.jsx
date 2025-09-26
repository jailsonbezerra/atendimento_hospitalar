import FormularioCadastroUsuario from './FormularioCadastroUsuario'
import FormularioLoginUsuario from './FormularioLoginUsuario'

import './CadastroLoginUsuario.css'


export default function CadastroLoginUsuario({ onLoginSuccess, onBackToMenu, usuario }) {
    return (
        <main className='container'>
            {
                usuario.papel === 'ADMIN' &&
                <section className='cadastro-usuario'>
                    <h1>Cadastrar Usuario</h1>

                    <FormularioCadastroUsuario />
                </section>
            }

            <section className='login-usuario'>
                <h1>Login de Usuario</h1>

                <FormularioLoginUsuario onBackToMenu={onBackToMenu} onLoginSuccess={onLoginSuccess} />
            </section>
        </main>
    )
}